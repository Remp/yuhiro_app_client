import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";

export const Touch =
  Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;
