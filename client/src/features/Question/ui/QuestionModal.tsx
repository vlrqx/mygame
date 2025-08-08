import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import { setModalQuestion } from "@/entities/Restaurants/model/restaurantsSlice";

export default function QuestionModal(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { isModal } = useAppSelector(
    (state) => state.
  );


  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onHide();
    }, 20000); // 20 секунд

    // Очистка таймера при закрытии или размонтировании
    return () => clearTimeout(timer);
  }, [show, onHide]);


  return (
    <Modal show={} centered>
      <Modal.Header closeButton>
        <Modal.Title>{}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{question}</p>
        <input>Категория: {}</input>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(setModalRest())}>
          Ответить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
