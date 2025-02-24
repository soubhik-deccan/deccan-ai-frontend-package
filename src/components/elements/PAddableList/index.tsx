import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { MdDragIndicator } from "react-icons/md";
import {
  PiCheck,
  PiPencilSimpleLineLight,
  PiPlus,
  PiTrashLight,
  PiX,
} from "react-icons/pi";
import validator from "validator";
import PButton from "../PButton";
import { TPAddableListProps } from "./type";

const PAddableList: FC<TPAddableListProps> = ({
  placeholder = "Add Item",
  onItemsChange,
  value,
  hideInput = false,
  isError = false,
  inputValidation,
  reRender = false,
  renderType = "input",
  disabled = false,
}) => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [items, setItems] = useState<string[]>(value || []);
  const [newItem, setNewItem] = useState<string>("");
  const [editItem, setEditItem] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const inputValidator = (input: string) => {
    switch (inputValidation) {
      case "url":
        return validator.isURL(input);
      case "email":
        return validator.isEmail(input);
      default:
        return false;
    }
  };

  // Avoid calling onItemsChange if items haven't changed
  useEffect(() => {
    if (!isFirstRender) {
      onItemsChange(items);
    } else {
      setIsFirstRender(false);
    }
  }, [items]);

  useEffect(() => {
    if (reRender && Array.isArray(value)) {
      setItems(value);
    }
  }, [value, reRender]);

  useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingIndex]);

  const handleAddItem = useCallback(() => {
    if (newItem.trim() && editingIndex === null) {
      if (inputValidation) {
        if (!inputValidator(newItem)) {
          alert("Input format is not valid");
          return;
        }
      }
      setIsFirstRender(false);
      setItems((prevItems) => [...prevItems, newItem]);
      setNewItem("");
    }
  }, [newItem, editingIndex]);

  const handleUpdateItem = useCallback(() => {
    if (editingIndex !== null && editItem.trim()) {
      if (inputValidation) {
        if (!inputValidator(editItem)) {
          alert("Input format is not valid");
          return;
        }
      }
      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[editingIndex] = editItem;
        return updatedItems;
      });
      setEditingIndex(null);
      setEditItem("");
    }
  }, [editingIndex, editItem]);

  const handleCancelEdit = useCallback(() => {
    setEditingIndex(null);
    setEditItem("");
  }, []);

  const handleNewItemChange = useCallback(
    (
      event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
      setNewItem(event.target.value);
    },
    []
  );

  const handleEditItemChange = useCallback(
    (
      event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
      setEditItem(event.target.value);
    },
    []
  );

  const handleKeyDown = useCallback(
    (
      event:
        | KeyboardEvent<HTMLInputElement>
        | KeyboardEvent<HTMLTextAreaElement>,
      action: () => void
    ) => {
      if (event.key === "Enter") {
        action();
      }
    },
    []
  );

  const handleDeleteItem = useCallback((index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  }, []);

  const handleEditItem = useCallback(
    (index: number) => {
      setEditItem(items[index]);
      setEditingIndex(index);
    },
    [items]
  );

  const handleDragEnd = useCallback((result: any) => {
    if (!result.destination) {
      return;
    }

    setItems((prevItems) => {
      const updatedItems = Array.from(prevItems);
      const [movedItem] = updatedItems.splice(result.source.index, 1);
      updatedItems.splice(result.destination.index, 0, movedItem);
      return updatedItems;
    });
  }, []);

  return (
    <div className="p-addable-list">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <ul
              className="p-addable-list__list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, index) => (
                <Draggable
                  key={index}
                  draggableId={String(index)}
                  index={index}
                >
                  {(provided) => (
                    <li
                      key={index}
                      className={`p-addable-list__list-item ${editingIndex === index
                          ? "p-addable-list__list-item--editing"
                          : ""
                        }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {editingIndex === index ? (
                        renderType === "input" ? (
                          <input
                            disabled={disabled}
                            type="text"
                            value={editItem}
                            onChange={handleEditItemChange}
                            onKeyDown={(e) =>
                              handleKeyDown(e, handleUpdateItem)
                            }
                            className="t-sm p-addable-list__input__edit"
                            ref={inputRef as MutableRefObject<HTMLInputElement>}
                          />
                        ) : (
                          <textarea
                            disabled={disabled}
                            value={editItem}
                            onChange={handleEditItemChange}
                            onKeyDown={(e) =>
                              handleKeyDown(e, handleUpdateItem)
                            }
                            className="t-sm p-addable-list__input__edit-textarea"
                            ref={
                              inputRef as MutableRefObject<HTMLTextAreaElement>
                            }
                          />
                        )
                      ) : (
                        <div className="p-addable-list__item-text-icon-wrapper">
                          <span className="p-addable-list__drag-icon">
                            <MdDragIndicator />
                          </span>
                          <p className="t-sm p-addable-list__item__text">
                            {item}
                          </p>
                        </div>
                      )}
                      <div className="p-addable-list__actions">
                        {!disabled && editingIndex === index ? (
                          <div className="p-addable-list__action-buttons__confirm-cancel">
                            <PButton
                              onClick={handleUpdateItem}
                              className="p-addable-list__action-button__confirm"
                              isOnlyIcon
                              icon={<PiCheck size={14} />}
                            />
                            <PButton
                              onClick={handleCancelEdit}
                              className="p-addable-list__action-button__cancel"
                              isOnlyIcon
                              icon={<PiX size={14} />}
                            />
                          </div>
                        ) : (
                          !disabled && (
                            <div className="p-addable-list__action-buttons__edit-delete">
                              <PButton
                                onClick={() => handleEditItem(index)}
                                className="p-addable-list__action-button__edit"
                                isOnlyIcon
                                icon={<PiPencilSimpleLineLight size={14} />}
                              />
                              <PButton
                                onClick={() => handleDeleteItem(index)}
                                className="p-addable-list__action-button__delete"
                                isOnlyIcon
                                icon={<PiTrashLight size={14} />}
                              />
                            </div>
                          )
                        )}
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {!hideInput ? (
                <li
                  className={`p-addable-list__add-item ${renderType === "textarea" ? "p-addable-list__stack" : ""
                    } ${isError ? "p-addable-list--error" : ""}`}
                >
                  {renderType === "input" ? (
                    <input
                      type="text"
                      value={newItem}
                      onChange={handleNewItemChange}
                      onKeyDown={(e) => handleKeyDown(e, handleAddItem)}
                      placeholder={
                        editingIndex !== null
                          ? "Finish editing to add new item"
                          : placeholder
                      }
                      className={`t-sm p-addable-list__input ${editingIndex !== null ? "disabled-add-input" : ""
                        } `}
                      disabled={disabled || editingIndex !== null}
                    />
                  ) : (
                    <textarea
                      value={newItem}
                      onChange={handleNewItemChange}
                      onKeyDown={(e) => handleKeyDown(e, handleAddItem)}
                      placeholder={
                        editingIndex !== null
                          ? "Finish editing to add new item"
                          : placeholder
                      }
                      className={`t-sm p-addable-list__text-area ${editingIndex !== null ? "disabled-add-input" : ""
                        } `}
                      disabled={disabled || editingIndex !== null}
                    />
                  )}
                  <PButton
                    variant="primary"
                    onClick={handleAddItem}
                    className={`p-addable-list__button ${editingIndex !== null ? "disabled-add-button" : ""
                      }`}
                    isOnlyIcon
                    icon={<PiPlus />}
                    disabled={disabled || editingIndex !== null}
                  />
                </li>
              ) : null}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PAddableList;
