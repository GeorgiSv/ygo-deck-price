import { useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';

function CardSearch() {

    const [card, setCard] = useState(null)

    function search(e) {
        e.preventDefault()
        const formData = new FormData(e.target);
        const cardName = formData.get('query');
        getCardInfo(cardName)
    }

    function getCardInfo(cardName) {
        let url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${cardName}`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                const currentCard = data.data[0];
                console.log(currentCard)
                console.log(currentCard.name)
                console.log(currentCard.card_prices[0])
                setCard(currentCard)
            })
    }


    return (
        <div>
            <form onSubmit={search}>
                <input name="query" />
                <button type="submit">Search</button>
            </form>

            {
                card
                    ?
                    <div>
                        {card.name}
                        <div>
                            Prices:
                            <div>Amazon: {card.card_prices[0].amazon_price}</div>
                            <div>CardMarket: {card.card_prices[0].cardmarket_price}</div>
                            <div>Ebay: {card.card_prices[0].ebay_price}</div>
                            <div>TCGPlayer: {card.card_prices[0].tcgplayer_price}</div>
                        </div>

                        <img src={card.card_images[0].image_url_small} alt="alternatetext" />
                    </div>

                    : ""
            }
        </div>

    );
}

export default CardSearch;