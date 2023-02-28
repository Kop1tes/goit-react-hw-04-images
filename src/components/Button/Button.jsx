import React from "react";
import css from "./Button.module.css";
import PropTypes from "prop-types";

export const Button = ({ response }) => (
    <button type="button" className={css.Button} onClick={response}>
        Load more
    </button>
);

Button.propTypes = {
    response: PropTypes.func.isRequired,
};