import initStoryshots, {
  multiSnapshotWithOptions,
} from "@storybook/addon-storyshots";

initStoryshots({
  framework: "react",
  suite: "FileProperties",
  test: multiSnapshotWithOptions({}),
});
