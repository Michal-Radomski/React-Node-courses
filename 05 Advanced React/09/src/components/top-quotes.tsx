import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import { fetchTopQuotes } from "../api/quoteApi";

const Container = styled.div`
  padding-top: 8px;
  max-width: 2xl;
  margin: auto;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 2xl;
  margin-bottom: 4px;
`;

const ErrorMessage = styled.p`
  color: #e53e3e; /* Tailwind: text-red-900 */
`;

const LoadingMessage = styled.p``;

const QuotesContainer = styled.div`
  max-height: 96;
  overflow-y: auto;
  border-spacing: 1px;
`;

const QuoteBlock = styled.blockquote`
  position: relative;
  padding: 4px;
  font-size: xl;
  font-style: italic;
  border-left: 4px solid #d1d5db; /* Tailwind: border-neutral-500 */
  background-color: #f3f4f6; /* Tailwind: bg-neutral-100 */
  color: #6b7280; /* Tailwind: text-neutral-600 */

  &:not(:last-child) {
    border-bottom: 1px solid #d1d5db; /* Tailwind: divide-y */
  }
`;

const QuoteText = styled.p`
  margin-bottom: 4px;
`;

const AuthorCite = styled.cite`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AuthorName = styled.span`
  margin-bottom: 1px;
  font-size: sm;
  font-style: italic;
  font-weight: bold;
`;

const FetchTopQuotes = (): JSX.Element => {
  const { data: quotes, isLoading, isSuccess, isError } = useQuery("top-quotes", fetchTopQuotes);

  return (
    <React.Fragment>
      <Container>
        <div>
          <Title>Top Quotes</Title>
          {isError ? <ErrorMessage>There was a problem with fetching quotes</ErrorMessage> : null}
          {isLoading ? <LoadingMessage>Fetching quotes</LoadingMessage> : null}

          {isSuccess ? (
            <QuotesContainer>
              {(quotes as Quote[])?.map((quote: Quote) => (
                <QuoteBlock key={quote.id} className="quote">
                  <QuoteText>"{quote.quote}"</QuoteText>
                  <AuthorCite>
                    <AuthorInfo>
                      <AuthorName>{quote.author}</AuthorName>
                    </AuthorInfo>
                  </AuthorCite>
                </QuoteBlock>
              ))}
            </QuotesContainer>
          ) : null}
        </div>
      </Container>
    </React.Fragment>
  );
};

export default FetchTopQuotes;
