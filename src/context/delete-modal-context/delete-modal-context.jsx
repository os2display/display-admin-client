import React, { createContext, useContext } from "react";
import DeleteModalContext from './modal-context';

function useModal() {
  return useContext(DeleteModalContext);
};

export default useModal;
