import React, { useRef, useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import YoutubeIframe, { PLAYER_STATES, type YoutubeIframeRef } from "react-native-youtube-iframe";
import Typography from "@/src/components/common/Typography";
import { updateRoomPlayback } from "@/src/services/rooms";
import { useUnistyles } from "react-native-unistyles";
import { BackIcon } from "@/src/assets/svgs";

const PLAYER_HEIGHT = 280;
const PROGRESS_INTERVAL_MS = 5000;
const PROGRESS_BAR_UPDATE_MS = 1000;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type RoomWebViewProps = {
  roomId: string;
  token: string;
  isHost: boolean;
  videoId: string | null;
  isPlaying: boolean;
  initialProgress?: number;
  roomName: string;
  onBack: () => void;
  onEndParty?: () => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
};

export default function RoomWebView({
  roomId,
  token,
  isHost,
  videoId,
  isPlaying,
  initialProgress = 0,
  roomName,
  onBack,
  onEndParty,
  onPlayStateChange,
}: RoomWebViewProps) {
  const playerRef = useRef<YoutubeIframeRef | null>(null);
  const { theme } = useUnistyles();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [status, setStatus] = useState<"upcoming" | "playing" | "ended">(
    initialProgress > 0 || isPlaying ? "playing" : "upcoming"
  );
  const seekedToInitial = useRef(false);
  const progressBarWidth = useRef(300);

  const updatePlayback = useCallback(
    (updates: { progress?: number; isPlaying?: boolean; isCompleted?: boolean }) => {
      if (!isHost) return;
      updateRoomPlayback(roomId, updates, token).catch(() => {});
    },
    [roomId, token, isHost]
  );

  const handleChangeState = useCallback(
    (state: PLAYER_STATES) => {
      const statusStr = state === PLAYER_STATES.PLAYING ? "playing" : state === PLAYER_STATES.PAUSED ? "paused" : state === PLAYER_STATES.ENDED ? "ended" : state;
      console.log("[RoomWebView] state", { state: statusStr, isHost });
      if (state === PLAYER_STATES.ENDED) {
        setStatus("ended");
      } else if (state === PLAYER_STATES.PLAYING) {
        setStatus("playing");
      } else if (state === PLAYER_STATES.PAUSED || state === PLAYER_STATES.UNSTARTED) {
        setStatus("playing");
      }

      if (!isHost) return;
      if (state === PLAYER_STATES.PLAYING) {
        updatePlayback({ isPlaying: true });
      } else if (state === PLAYER_STATES.PAUSED || state === PLAYER_STATES.ENDED) {
        updatePlayback({ isPlaying: false });
      }
      if (state === PLAYER_STATES.ENDED) {
        updatePlayback({ isCompleted: true });
      }
    },
    [isHost, updatePlayback]
  );

  const handleReady = useCallback(() => {
    if (initialProgress > 0 && playerRef.current && !seekedToInitial.current) {
      seekedToInitial.current = true;
      playerRef.current.seekTo(initialProgress, true);
      setCurrentTime(initialProgress);
      console.log("[RoomWebView] seeked to initial progress", initialProgress);
    }
    playerRef.current?.getDuration().then((d) => {
      if (Number.isFinite(d)) setDuration(d);
    }).catch(() => {});
  }, [initialProgress]);

  useEffect(() => {
    if (!isHost || !videoId) return;
    const id = setInterval(() => {
      playerRef.current?.getCurrentTime().then((seconds) => {
        const progress = Math.floor(seconds);
        if (Number.isFinite(progress)) {
          setCurrentTime(seconds);
          updatePlayback({ progress });
        }
      }).catch(() => {});
    }, PROGRESS_INTERVAL_MS);
    return () => clearInterval(id);
  }, [isHost, videoId, updatePlayback]);

  useEffect(() => {
    const id = setInterval(() => {
      playerRef.current?.getCurrentTime().then((t) => setCurrentTime(t)).catch(() => {});
      playerRef.current?.getDuration().then((d) => setDuration(d)).catch(() => {});
    }, PROGRESS_BAR_UPDATE_MS);
    return () => clearInterval(id);
  }, [videoId]);

  const handlePlayPause = useCallback(() => {
    if (!isHost) return;
    const next = !isPlaying;
    onPlayStateChange?.(next);
    updatePlayback({ isPlaying: next });
    console.log("[RoomWebView] play/pause", { isPlaying: next });
  }, [isHost, isPlaying, updatePlayback, onPlayStateChange]);

  const handleSeekBack = useCallback(() => {
    if (!playerRef.current) return;
    playerRef.current.getCurrentTime().then((t) => {
      const next = Math.max(0, t - 10);
      playerRef.current?.seekTo(next, true);
      setCurrentTime(next);
      if (isHost) updatePlayback({ progress: Math.floor(next) });
      console.log("[RoomWebView] seek back", { to: next });
    }).catch(() => {});
  }, [isHost, updatePlayback]);

  const handleSeekForward = useCallback(() => {
    if (!playerRef.current) return;
    playerRef.current.getCurrentTime().then((t) => {
      playerRef.current?.getDuration().then((d) => {
        const next = Math.min(d, t + 10);
        playerRef.current?.seekTo(next, true);
        setCurrentTime(next);
        if (isHost) updatePlayback({ progress: Math.floor(next) });
        console.log("[RoomWebView] seek forward", { to: next });
      });
    }).catch(() => {});
  }, [isHost, updatePlayback]);

  const handleProgressPress = useCallback(
    (evt: { nativeEvent: { locationX?: number } }) => {
      if (!playerRef.current || !isHost) return;
      const locationX = evt.nativeEvent?.locationX ?? 0;
      const w = progressBarWidth.current;
      const ratio = w > 0 ? Math.max(0, Math.min(1, locationX / w)) : 0;
      const seekToSec = duration * ratio;
      playerRef.current.seekTo(seekToSec, true);
      setCurrentTime(seekToSec);
      updatePlayback({ progress: Math.floor(seekToSec) });
      console.log("[RoomWebView] progress bar seek", { seconds: seekToSec });
    },
    [duration, isHost, updatePlayback]
  );

  useEffect(() => {
    console.log("[RoomWebView] timeline", { currentTime: Math.floor(currentTime), duration: Math.floor(duration), status });
  }, [currentTime, duration, status]);

  if (!videoId || videoId.length < 11) {
    return (
      <View style={[styles.placeholder, styles.playerWrap]}>
        <View style={styles.headerOverlay}>
          <Pressable onPress={onBack} style={styles.headerBack}>
            <BackIcon width={18} height={16} color="#fff" />
          </Pressable>
          <Typography variant="body" weight="bold" color="#fff" numberOfLines={1} style={styles.headerTitle}>
            {roomName}
          </Typography>
        </View>
        <Typography variant="body" color={theme.color.textMuted}>
          No video set. Start a party from the lobby.
        </Typography>
      </View>
    );
  }

  const progressRatio = duration > 0 ? currentTime / duration : 0;

  return (
    <View style={styles.playerWrap}>
      <View style={styles.videoContainer}>
        <YoutubeIframe
          ref={playerRef}
          height={PLAYER_HEIGHT}
          videoId={videoId}
          play={isPlaying}
          onChangeState={handleChangeState}
          onReady={handleReady}
        initialPlayerParams={{
          controls: false,
          modestbranding: true,
          rel: false,
          start: Math.floor(initialProgress),
        }}
        webViewStyle={[styles.playerFixed, { backgroundColor: "#000" }]}
        webViewProps={{ style: { backgroundColor: "#000" } }}
        />
        <View style={styles.headerOverlay} pointerEvents="box-none">
          <View style={styles.headerRow}>
            <Pressable onPress={onBack} style={styles.headerBack}>
              <BackIcon width={18} height={16} color="#fff" />
            </Pressable>
            <Typography variant="body" weight="bold" color="#fff" numberOfLines={1} style={styles.headerTitle}>
              {roomName}
            </Typography>
            {isHost && onEndParty ? (
              <Pressable onPress={onEndParty} style={styles.endPartyBtn}>
                <Typography variant="smallBody" weight="bold" color="#fff">
                  End party
                </Typography>
              </Pressable>
            ) : (
              <View style={styles.endPartyPlaceholder} />
            )}
          </View>
        </View>

        {isHost && (
          <>
            <View style={styles.controlsOverlay} pointerEvents="box-none">
              <View style={styles.controlsRow}>
                <Pressable onPress={handleSeekBack} style={styles.controlBtn}>
                  <Typography variant="body" color="#fff">{"\u2039\u2039"}</Typography>
                </Pressable>
                <Pressable onPress={handlePlayPause} style={styles.controlBtn}>
                  <Typography variant="subHeading" color="#fff">{isPlaying ? "||" : "\u25B6"}</Typography>
                </Pressable>
                <Pressable onPress={handleSeekForward} style={styles.controlBtn}>
                  <Typography variant="body" color="#fff">{"\u203A\u203A"}</Typography>
                </Pressable>
              </View>
            </View>
            <View style={styles.progressRow}>
              <Typography variant="caption" color="#fff">
                {formatTime(currentTime)} / {formatTime(duration)}
              </Typography>
              <Pressable
                style={styles.progressTrack}
                onPress={handleProgressPress}
                onLayout={(e) => {
                  progressBarWidth.current = e.nativeEvent.layout.width;
                }}
              >
                <View style={[styles.progressFill, { width: `${progressRatio * 100}%` }]} />
              </Pressable>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  playerWrap: {
    width: "100%",
    height: PLAYER_HEIGHT,
    backgroundColor: "#000",
  },
  playerFixed: {
    width: "100%",
    height: PLAYER_HEIGHT,
  },
  videoContainer: {
    width: "100%",
    height: PLAYER_HEIGHT,
    backgroundColor: "#000",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerBack: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  headerTitle: {
    flex: 1,
    marginLeft: 12,
  },
  endPartyBtn: {
    backgroundColor: "#E50914",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  endPartyPlaceholder: {
    width: 1,
  },
  controlsOverlay: {
    position: "absolute",
    bottom: 44,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  controlBtn: {
    padding: 12,
  },
  progressRow: {
    position: "absolute",
    bottom: 8,
    left: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#E50914",
    borderRadius: 2,
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
});
