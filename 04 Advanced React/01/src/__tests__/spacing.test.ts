import spacing from "../spacing";

test("snapshot of spacing", (): void => {
  expect(spacing).toMatchSnapshot();
});
