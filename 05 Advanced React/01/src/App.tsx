import React from "react";

import "./App.scss";
import SplitScreen from "./components/SplitScreen";
import { authors } from "./data/authors";
import { RegularList } from "./components/lists/Regular";
import { SmallAuthorListItem } from "./components/authors/SmallListItems";
import { LargeAuthorListItem } from "./components/authors/LargeListItems";
import { books } from "./data/books";
import { NumberedList } from "./components/lists/Numbered";
import { SmallBookListItem } from "./components/books/SmallListItems";
import { LargeBookListItem } from "./components/books/LargeListItems";
import { Modal } from "./components/Modal";

const LeftSideComp = ({ title }: { title: string }): JSX.Element => {
  return <h2 style={{ backgroundColor: "crimson" }}>{title}</h2>;
};

const RightSideComp = ({ title }: { title: string }): JSX.Element => {
  return <h2 style={{ backgroundColor: "burlywood" }}>{title}</h2>;
};

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <Modal>
        <LargeBookListItem book={books[0]} />
      </Modal>

      <SplitScreen leftWidth={1} rightWidth={3}>
        <LeftSideComp title={"Right"} />
        <RightSideComp title={"Left"} />
      </SplitScreen>

      <RegularList items={authors} sourceName={"author"} ItemComponent={SmallAuthorListItem} />
      <NumberedList items={authors} sourceName={"author"} ItemComponent={LargeAuthorListItem} />
      <RegularList items={books} sourceName={"book"} ItemComponent={SmallBookListItem} />
      <NumberedList items={books} sourceName={"book"} ItemComponent={LargeBookListItem} />
    </React.Fragment>
  );
};

export default App;
