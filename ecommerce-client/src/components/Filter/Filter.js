import styles from "../../styles/Common.module.css";
import {FaFilter} from "react-icons/fa";


const Filter = ({handleOnFilter, filterState}) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                Filter
                <FaFilter/>
            </div>
            <form>
                {Object.keys(filterState).map((brand) => (
                    <label key={`brand-${brand}`}>
                        <input
                            type="checkbox"
                            name={brand}
                            onChange={handleOnFilter}
                            checked={filterState[brand]}
                        />
                        {brand}
                    </label>
                ))}
            </form>
        </div>
    );
};

export default Filter;
