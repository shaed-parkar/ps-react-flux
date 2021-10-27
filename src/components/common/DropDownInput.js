import React from "react";
import PropTypes from "prop-types";

function DropDownInput(props) {
  let wrapperClass = "form-group";
  if (props.error.length > 0) {
    wrapperClass += " has-error";
  }
  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <select
          id={props.id}
          name={props.name}
          value={props.value || props.values[0]}
          onChange={props.onChange}
          error={props.error}
          className="form-control"
        >
          {props.values.map((_value) => {
            return <option value={_value.id}>{_value.name}</option>;
          })}
        </select>
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}

export default DropDownInput;

DropDownInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  values: PropTypes.array.isRequired,
  error: PropTypes.string,
};

DropDownInput.defaultProps = {
  error: "",
};
