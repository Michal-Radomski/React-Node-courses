import fontSize from "../fontSize";

test("snapshot of fontsizes", (): void => {
  expect(fontSize).toMatchSnapshot();
});
