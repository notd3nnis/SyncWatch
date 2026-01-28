import React from "react";
import { View, Modal, Pressable } from "react-native";
import { CustomModalProps } from "./types";
import { styles } from "./styles";

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  children,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        {children}
      </View>
    </Modal>
  );
};

export default CustomModal;
