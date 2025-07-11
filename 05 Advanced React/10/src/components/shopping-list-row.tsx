/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledInputContainer = styled.div``;

const StyledInput = styled.input`
  width: 100%;
`;

const StyledText = styled.div``;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const StyledButton = styled.button`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const useEditShoppingItem = (props: {
  item: Item;
  updateItem?: ({ index, item }: { index: number; item: Item }) => void;
  index?: number;
}) => {
  const { item, updateItem, index } = props;

  const [name, setName] = React.useState<string>(item.name);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  React.useEffect(() => {
    setName(props.item.name);
  }, [props.item]);

  const onSaveItem = () => {
    updateItem!({
      index,
      item: {
        ...item,
        name,
      },
    } as any);
    setIsEditing(false);
  };

  const onEditItem = (): void => {
    setIsEditing(true);
  };

  const cancelEdit = (): void => {
    setIsEditing(false);
    setName(props.item.name);
  };

  return {
    name,
    isEditing,
    cancelEdit,
    setName,
    onSaveItem,
    onEditItem,
  };
};

const ShoppingListRow = (props: {
  item: Item;
  deleteItem?: (arg0: Item) => void;
  index: number;
  updateItem?: ({ index, item }: { index: number; item: Item }) => void;
}): JSX.Element => {
  const { item, deleteItem, index } = props;

  const { name, isEditing, cancelEdit, setName, onSaveItem, onEditItem } = useEditShoppingItem(props);

  return (
    <React.Fragment>
      <StyledContainer>
        <StyledInputContainer>
          {isEditing ? (
            <StyledInput type="text" value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            <StyledText>{item.name}</StyledText>
          )}
        </StyledInputContainer>
        <StyledButtonContainer>
          {isEditing ? (
            <React.Fragment>
              <StyledButton onClick={onSaveItem}>Save</StyledButton>
              <StyledButton onClick={cancelEdit}>Cancel</StyledButton>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <StyledButton onClick={onEditItem}>Edit</StyledButton>
              <StyledButton onClick={() => deleteItem!({ index } as any)}>Delete</StyledButton>
            </React.Fragment>
          )}
        </StyledButtonContainer>
      </StyledContainer>
    </React.Fragment>
  );
};

export default ShoppingListRow;
