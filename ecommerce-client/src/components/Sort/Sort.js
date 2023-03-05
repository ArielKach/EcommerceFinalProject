import styles from "../../styles/Common.module.css";
import {FaSort} from "react-icons/fa";

const sortObj = [
    {name: "lowToHigh", value: "Low to high"},
    {name: "highToLow", value: "High to low"},
];

const Sort = ({handleSortChange, sortState}) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Sort
                <FaSort/>
            </div>
            <form>
                {sortObj.map((option) => (
                    <label key={`sort-option-${option.name}`}>
                        <input
                            type="radio"
                            name={option.name}
                            onChange={handleSortChange}
                            checked={sortState[option.name]}
                        />
                        {option.value}
                    </label>
                ))}
            </form>
        </div>
    );
};

export default Sort;
