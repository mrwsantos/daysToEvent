import { useState } from "react";
import { CheckSquare, Square } from "@phosphor-icons/react";
import styles from "../../styles/components/CheckList.module.scss";

const CheckList = ({ data }: any) => {
  const [checkList, setCheckList] = useState(data);

  function handleCheck(title: string) {
    setCheckList((state: any) => {
      return state.map((item: any) => {
        if (item.title === title) {
          item.done = !item.done;
        }

        return item;
      });
    });
  }

  if (!checkList?.length) {
    return null
  }

  return (
    <ul className={styles.checklist}>
      {checkList?.map((item: any, index: any) => (
        <li
          key={index}
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
