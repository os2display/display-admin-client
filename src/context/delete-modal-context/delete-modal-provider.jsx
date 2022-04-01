import React, { useCallback, useState } from "react";
import DeleteModalContext from './modal-context';
import DeleteModal from './delete-modal';

function ModalProvider({children}) {
  const [modal, setModal] = useState();
  const [selected, setSelected] = useState([]);

  const unSetModal = useCallback(() => {
    setModal();
    setSelected([]);
  }, [setModal]);

  return (
    <DeleteModalContext.Provider value={{ unSetModal, setModal, setSelected, selected }} {...children}>
      {children}
      {modal && (
        <DeleteModal
          onAccept={modal.accept}
          unSetModal={unSetModal}
          selected={selected}
        />
      )}
    </DeleteModalContext.Provider>
  );
};

export default ModalProvider;
