import {StyleSheet} from 'react-native-unistyles'

export const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
    paddingHorizontal: theme.spacing.s,
    paddingBottom: rt.insets.bottom,
  },
  searchSection: {
    flex: 1,
    justifyContent: "center",
  },
  searchesWrapper: {
    paddingBottom: theme.spacing.m,
  },
  movieSection: {
    flex: 3.5,
  },
  gridContent: {
    paddingVertical: theme.spacing.s,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: theme.spacing.m,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200,
  },
  errorText: {
    textAlign: "center",
    paddingHorizontal: theme.spacing.m,
  },
  movieCard: {
    height: 100,
    width: 190,
    borderRadius: theme.radius.m,
  },
  movieImage: {
    width: "100%",
    height: "100%",
  },
}));
