import React from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../hooks/reducerhooks";
import { RootState } from "../../store";

function Question() {
  const { isError, isLoading, testStanzas } = useAppSelector(
    (state: RootState) => state.lyrics
  );

  const question = `Me pregunto dónde la conociste, pero creo que sé
    Esa noche pasa'o de 512 y Percocet
    Tenía llamadas tuyas perdida' en el cel
    Imaginando lo peor, ya no sabía qué hacer`;
  return (
    <StyledQuestionContainer>
      {isLoading ? (
        <p>{"Loading..."}</p>
      ) : isError ? (
        <p>{`Couldn't fetch questions`}</p>
      ) : (
        <p>{testStanzas[0]}</p>
      )}
    </StyledQuestionContainer>
  );
}

export default Question;

const StyledQuestionContainer = styled.section``;
