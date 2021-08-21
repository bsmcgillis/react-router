import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
    return quotes.sort((quoteA, quoteB) => {
        if (ascending) {
            return quoteA.id > quoteB.id ? 1 : -1;
        } else {
            return quoteA.id < quoteB.id ? 1 : -1;
        }
    });
};

const QuoteList = (props) => {
    const history = useHistory();
    const location = useLocation();

    console.log('location', location); //@DEBUG

    const queryParams = new URLSearchParams(location.search);

    const isSortingAscending = queryParams.get('sort') === 'asc';

    const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

    const changeSortingHandler = () => {
        const order = isSortingAscending ? 'desc' : 'asc';

        // You can build a path object to navigate to a page
        history.push({
            pathname: location.pathname,
            search: `?sort=${order}`
        });

        // Or you can just construct a URL string like usual
        // history.push(`${location.pathname}?sort=${order}`)
    };

    return (
        <Fragment>
            <div className={classes.sorting}>
                <button onClick={changeSortingHandler}>
                    Sort {isSortingAscending ? 'Descending' : 'Ascending'}
                </button>
            </div>
            <ul className={classes.list}>
                {sortedQuotes.map((quote) => (
                    <QuoteItem
                        key={quote.id}
                        id={quote.id}
                        author={quote.author}
                        text={quote.text}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default QuoteList;
