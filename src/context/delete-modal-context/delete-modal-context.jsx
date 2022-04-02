import { useContext } from "react";
import DeleteModalContext from "./modal-context";

/**
 * Delete modal context as hook
 *
 * @returns {object} The delete modal context as a hook.
 */
function useModal() {
  return useContext(DeleteModalContext);
}

export default useModal;
