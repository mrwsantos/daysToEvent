import { useEffect, useState } from "react";
import { CheckSquare, Square } from "@phosphor-icons/react";
import styles from "../../styles/components/CheckList.module.scss";

const CheckList = ({ data }: any) => {
  const [checkList, setCheckList] = useState(data);

  /**
   * Manipula o estado do checklist e atualiza o armazenamento local.
   * @param title O título do item do checklist a ser manipulado.
   */
  function handleCheck(title: string) {
    setCheckList((state: any) => {
      return state.map((item: any, index: number) => {
        if (item.title !== title) {
          return item;
        }

        item.done = !item.done;

        const checklistStorage = localStorage.getItem("checklist");
        const checklistArray = checklistStorage
          ? JSON.parse(checklistStorage)
          : [];

        const checklist = checklistArray.filter(
          (checklistItem: any) =>
            item.title !== checklistItem.title && item.index !== index
        );

        checklist.push({
          index,
          title,
          done: item.done,
        });

        const checklistString = JSON.stringify(checklist);

        localStorage.setItem("checklist", checklistString);

        return item;
      });
    });
  }

  /**
   * Obtém o checklist armazenado localmente via LocalStorage e atualiza o estado.
   */
  function getInitialChecklist() {
    const checklistStorage = localStorage.getItem("checklist");

    if (!checklistStorage || !checklistStorage.length) {
      return;
    }

    const checklistArray = checklistStorage ? JSON.parse(checklistStorage) : [];

    setCheckList((state: any) => {
      return state.map((item: any, index: number) => {
        const checklistItem = checklistArray.find(
          (checklistItem: any) =>
            checklistItem.title === item.title && checklistItem.index === index
        );

        if (!checklistItem) {
          return item;
        }

        item.done = checklistItem.done;

        return item;
      });
    });
  }

  useEffect(() => {
    getInitialChecklist();
  }, []);

  if (!checkList?.length) {
    return null;
  }

  return (
    <ul className={styles.checklist}>
      {checkList?.map((item: any, index: any) => (
        <li
          key={`checklist-item-${index}-${item.title}`}
          className={styles.checklist__item}
          onClick={() => handleCheck(item.title)}
        >
          {(item.done && <CheckSquare size={24} weight="fill" />) || (
            <Square size={24} />
          )}
          {item.title}
        </li>
      ))}
    </ul>
  );
};

export default CheckList;
