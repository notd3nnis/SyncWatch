import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, View, StyleSheet, StatusBar } from "react-native";
import RoomWebView from "@/src/components/RoomWebView";
import RoomChat from "@/src/components/RoomChat";
import { useAuth } from "@/src/context/AuthContext";
import { getRoom, joinRoom, updateRoomPlayback } from "@/src/services/rooms";

const ROOM_POLL_INTERVAL_MS = 3000;
const WATCH_ROOM_BG = "#0a0a0a";

function normalizeYouTubeVideoId(value: string | undefined | null): string | null {
  if (!value || typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length >= 11 && /^[a-zA-Z0-9_-]+$/.test(trimmed)) return trimmed;
  const match = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function RoomWebViewScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const router = useRouter();
  const { user, token } = useAuth();
  const [isHost, setIsHost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [roomName, setRoomName] = useState("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHostRef = useRef(false);

  const setPlayingFromHost = useCallback((value: boolean) => {
    setIsPlaying(value);
  }, []);

  const fetchRoom = useCallback(() => {
    if (!roomId || !token) return;
    getRoom(roomId, token)
      .then((room) => {
        isHostRef.current = room.hostId === user?.id;
        setIsHost(isHostRef.current);
        const id = room.videoId ?? normalizeYouTubeVideoId(room.videoUrl) ?? null;
        setVideoId(id);
        setIsPlaying(room.isPlaying ?? false);
        setProgress(room.progress ?? 0);
        setRoomName(room.name || "Watch Party");
      })
      .catch(() => {});
  }, [roomId, token, user?.id]);

  useEffect(() => {
    if (!roomId || !token) {
      setLoading(false);
      return;
    }
    getRoom(roomId, token)
      .then((room) => {
        isHostRef.current = room.hostId === user?.id;
        setIsHost(isHostRef.current);
        const id = room.videoId ?? normalizeYouTubeVideoId(room.videoUrl) ?? null;
        setVideoId(id);
        setIsPlaying(room.isPlaying ?? false);
        setProgress(room.progress ?? 0);
        setRoomName(room.name || "Watch Party");
        joinRoom(roomId, token).catch(() => {});
      })
      .catch((e) => {
        console.error("[RoomWebViewScreen] failed to load room", e);
      })
      .finally(() => setLoading(false));
  }, [roomId, token, user?.id]);

  useEffect(() => {
    if (!roomId || !token || loading) return;
    pollRef.current = setInterval(fetchRoom, ROOM_POLL_INTERVAL_MS);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      pollRef.current = null;
    };
  }, [roomId, token, loading, fetchRoom]);

  useEffect(() => {
    return () => {
      if (isHostRef.current && roomId && token) {
        updateRoomPlayback(roomId, { isPlaying: false }, token).catch(() => {});
        console.log("[RoomWebViewScreen] host left, set isPlaying=false");
      }
    };
  }, [roomId, token]);

  const handleEndParty = useCallback(async () => {
    if (!isHost || !roomId || !token) return;
    try {
      await updateRoomPlayback(roomId, { isCompleted: true, isPlaying: false }, token);
      console.log("[RoomWebViewScreen] party ended by host");
      router.back();
    } catch (e) {
      console.error("[RoomWebViewScreen] end party failed", e);
    }
  }, [isHost, roomId, token, router]);

  if (!roomId || !token) {
    return null;
  }

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: WATCH_ROOM_BG }]} edges={["top", "bottom"]}>
        <StatusBar barStyle="light-content" backgroundColor={WATCH_ROOM_BG} />
        <View style={styles.loadingCenter}>
          <ActivityIndicator size="large" color="#E50914" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: WATCH_ROOM_BG }]} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" backgroundColor={WATCH_ROOM_BG} />
      <RoomWebView
        roomId={roomId}
        token={token}
        isHost={isHost}
        videoId={videoId}
        isPlaying={isPlaying}
        initialProgress={progress}
        roomName={roomName}
        onBack={() => router.back()}
        onEndParty={handleEndParty}
        onPlayStateChange={setPlayingFromHost}
      />
      <View style={styles.chatWrap}>
        <RoomChat roomId={roomId} token={token} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chatWrap: {
    flex: 1,
  },
});
