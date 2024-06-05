import Styles from "./index.module.scss";

function Checkbox({ isChecked, setIsChecked, label }) {
  return (
    <div className={Styles.container}>
      <input
        type="checkbox"
        // className="custom-control-input"
        // id={`customCheck1-${product.slug}`}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />

      <label
        // className="custom-control-label"
        // htmlFor={`customCheck1-${product.slug}`}
        dangerouslySetInnerHTML={{ __html: label }}
      />
    </div>
  );
}

export default Checkbox;
