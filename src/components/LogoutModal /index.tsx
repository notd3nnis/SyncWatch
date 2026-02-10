import React from "react";
import { View, Modal, Pressable } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import Typography from "../common/Typography";
import Button from "../common/Button";
import { CloseIcon } from "@/src/assets/svgs";

import { styles } from "./styles";

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const { theme } = useUnistyles();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />

        <View style={styles.modalContainer}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <View style={styles.closeIconWrapper}>
              <CloseIcon width={19} height={19} />
            </View>
          </Pressable>

          <View style={styles.content}>
            <Typography
              align="center"
              variant="body"
              weight="medium"
              style={styles.message}
            >
              Are you sure you want to logout from this account?
            </Typography>
            <View style={styles.buttonGroup}>
              <View style={styles.buttonWrapper}>
                <Button
                  color={theme.color.background}
                  title="no"
                  variant="netural"
                  onPress={onClose}
                >
                  No
                </Button>
              </View>
              <View>
                <Button variant="tertiary" onPress={onConfirm} title="no">
                  Yes, go ahead
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
