import React from "react";

import { MdAdd } from "react-icons/md";

import "./styles.css";
// COMPONENTS
import { Form, InputGroup } from "react-bootstrap";

interface Props {
  onClick?: () => void;
  onChange?: (event: any) => void;
  placeholder?: string;
  value?: any;
}

const SearchBarContainer = ({
  onClick,
  onChange,
  placeholder,
  value
}: Props) => {
  return (
    <>
      <InputGroup style={{ paddingBottom: "5px" }}>
        <Form.Control
          type="text"
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
        <InputGroup.Prepend onClick={onClick}>
          <InputGroup.Text className="add-button">
            <MdAdd size={25} />
          </InputGroup.Text>
        </InputGroup.Prepend>
      </InputGroup>
    </>
  );
};

export { SearchBarContainer };
