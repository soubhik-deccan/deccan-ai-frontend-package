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
import PButton from "../PButton";
import {
  PDynamicAddableListComponentMapper,
  TPDynamicAddableListProps,
} from "./type";

const createEmptyItem = (
  componentMapper: PDynamicAddableListComponentMapper[]
) =>
  componentMapper.reduce((acc, { key }) => {
    acc[key] = "";
    return acc;
  }, {} as Record<string, string>);

const PDynamicAddableList: FC<TPDynamicAddableListProps> = ({
  placeholder = "Add Item",
  onItemsChange,
  value = [],
  hideInput = false,
  isError = false,
  inputValidation,
  reRender = false,
  componentMapper,
  disabled = false,
}) => {
  const [items, setItems] = useState<Record<string, string>[]>(value || []);
  const [newItem, setNewItem] = useState<Record<string, string>>(() =>
    createEmptyItem(componentMapper)
  );
  const [editItem, setEditItem] = useState<Record<string, string>>(() =>
    createEmptyItem(componentMapper)
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (value) {
      setItems(value);
    }
  }, [value]);

  useEffect(() => {
    onItemsChange(items);
  }, [items]);

  const handleNewItemChange = useCallback(
    (
      event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      field: string
    ) => {
      setNewItem((prevItem) => ({
        ...prevItem,
        [field]: event.target.value,
      }));
    },
    []
  );

  const handleEditItemChange = useCallback(
    (
      event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
      field: string
    ) => {
      setEditItem((prevItem) => ({
        ...prevItem,
        [field]: event.target.value,
      }));
    },
    []
  );

  const handleKeyDown = useCallback(
    (
      event: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
      action: () => void
    ) => {
      if (event.key === "Enter") {
        action();
      }
    },
    []
  );

  // const handleAddItem = useCallback(() => {
  // 	if (
  // 		componentMapper.every(({ key }) =>
  // 			newItem[key].trim()
  // 		)
  // 	) {
  // 		setItems((prevItems) => [...prevItems, newItem]);
  // 		setNewItem(createEmptyItem(componentMapper));
  // 	}
  // }, [newItem, componentMapper]);

  const handleAddItem = useCallback(() => {
    let isValid = true;
    let shouldShowNotification = false;
    let notifiedText = "Validation error!";

    for (const {
      key,
      fieldValidation,
      showNotification,
      notificationText,
    } of componentMapper) {
      const value = newItem[key].trim();
      // If fieldValidation is provided, use it, otherwise check if the value is not empty
      if (fieldValidation) {
        isValid = fieldValidation(value);
      } else {
        isValid = value !== "";
      }
      if (!isValid) {
        shouldShowNotification = showNotification === true;
        notifiedText = notificationText || notifiedText;
        break;
      }
    }

    if (isValid) {
      setItems((prevItems) => [...prevItems, newItem]);
      setNewItem(createEmptyItem(componentMapper));
    } else {
      if (shouldShowNotification) alert(notifiedText);
    }
  }, [newItem, componentMapper]);

  const handleUpdateItem = useCallback(() => {
    if (
      editingIndex !== null &&
      componentMapper.every(({ key }) => editItem[key].trim())
    ) {
      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[editingIndex] = editItem;
        return updatedItems;
      });
      setEditingIndex(null);
      setEditItem(createEmptyItem(componentMapper));
    }
  }, [editingIndex, editItem, componentMapper]);

  const handleCancelEdit = useCallback(() => {
    setEditingIndex(null);
    setEditItem(createEmptyItem(componentMapper));
  }, [componentMapper]);

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
    if (!result.destination) return;

    setItems((prevItems) => {
      const updatedItems = Array.from(prevItems);
      const [movedItem] = updatedItems.splice(result.source.index, 1);
      updatedItems.splice(result.destination.index, 0, movedItem);
      return updatedItems;
    });
  }, []);

  return (
    <div className="p-dynamic-addable-list">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <ul
              className="p-addable-list__list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items?.map((item, index) => (
                <Draggable
                  key={index}
                  draggableId={String(index)}
                  index={index}
                >
                  {(provided) => (
                    <li
                      className={`p-addable-list__list-item ${editingIndex === index
                          ? "p-addable-list__list-item--editing"
                          : ""
                        }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {editingIndex === index ? (
                        <div className="p-addable-list__stack">
                          {componentMapper.map(({ id, key, renderType }) =>
                            renderType === "input" ? (
                              <input
                                disabled={disabled}
                                key={id}
                                type="text"
                                value={editItem[key]}
                                onChange={(e) => handleEditItemChange(e, key)}
                                onKeyDown={(e) =>
                                  handleKeyDown(e, handleUpdateItem)
                                }
                                className="t-sm p-addable-list__input__edit"
                                ref={
                                  inputRef as MutableRefObject<HTMLInputElement>
                                }
                              />
                            ) : (
                              <textarea
                                key={id}
                                disabled={disabled}
                                value={editItem[key]}
                                onChange={(e) => handleEditItemChange(e, key)}
                                onKeyDown={(e) =>
                                  handleKeyDown(e, handleUpdateItem)
                                }
                                className="t-sm p-addable-list__input__edit-textarea"
                                ref={
                                  inputRef as MutableRefObject<HTMLTextAreaElement>
                                }
                              />
                            )
                          )}
                        </div>
                      ) : (
                        <div className="p-addable-list__item-text-icon-wrapper">
                          <span className="t-sm index-number">{index + 1}</span>
                          <span className="p-addable-list__drag-icon">
                            <MdDragIndicator />
                          </span>
                          <div className="p-addable-list__stack">
                            {componentMapper.map(({ id, key }) => (
                              <p
                                key={id}
                                className="t-sm p-addable-list__item__text"
                              >
                                {item[key]}
                              </p>
                            ))}
                          </div>
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
              {!hideInput && (
                <li
                  className={`p-addable-list__add-item ${isError ? "p-addable-list--error" : ""
                    }`}
                >
                  <div className="p-addable-list__stack">
                    {componentMapper.map(({ id, key, renderType }) =>
                      renderType === "input" ? (
                        <input
                          key={id}
                          type="text"
                          value={newItem[key]}
                          onChange={(e) => handleNewItemChange(e, key)}
                          onKeyDown={(e) => handleKeyDown(e, handleAddItem)}
                          placeholder={
                            editingIndex !== null
                              ? "Finish editing to add new item"
                              : `Write your ${key} here..`
                          }
                          className={`t-sm p-addable-list__input ${editingIndex !== null ? "disabled-add-input" : ""
                            }`}
                          disabled={disabled || editingIndex !== null}
                        />
                      ) : (
                        <textarea
                          key={id}
                          value={newItem[key]}
                          onChange={(e) => handleNewItemChange(e, key)}
                          onKeyDown={(e) => handleKeyDown(e, handleAddItem)}
                          placeholder={
                            editingIndex !== null
                              ? "Finish editing to add new item"
                              : `Write your ${key} here..`
                          }
                          className={`t-sm p-addable-list__text-area ${editingIndex !== null ? "disabled-add-input" : ""
                            }`}
                          disabled={disabled || editingIndex !== null}
                        />
                      )
                    )}
                  </div>
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
              )}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PDynamicAddableList;
