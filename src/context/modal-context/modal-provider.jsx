import React, { useCallback, useState } from "react";
import { PropTypes } from "prop-types";
import DeleteModalContext from "./modal-context";
import DeleteModal from "./delete-modal";
import InfoModal from "./info-modal";

/**
 * The modal provider, allows to open delete/info modals
 *
 * @param {object} props - The props.
 * @param {Array} props.children The children being passed from parent
 * @returns {object} The modal provider.
 */
function ModalProvider({ children }) {
  const [modal, setModal] = useState();
  const [selected, setSelected] = useState([]);

  const unSetModal = useCallback(() => {
    setModal();
  }, [setModal]);

  return (
    <DeleteModalContext.Provider
      value={{ unSetModal, setModal, setSelected, selected }}
    >
      {children}
      {modal?.delete && (
        <DeleteModal
          onAccept={modal.accept}
          unSetModal={unSetModal}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      {modal?.info && (
        <InfoModal
          apiCall={modal.apiCall}
          displayData={modal.displayData}
          modalTitle={modal.modalTitle}
          dataKey={modal.dataKey}
          redirectTo={modal.redirectTo}
          unSetModal={unSetModal}
        />
      )}
    </DeleteModalContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalProvider;
