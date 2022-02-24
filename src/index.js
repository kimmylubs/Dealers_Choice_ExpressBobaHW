const ul = document.querySelector('ul');

ul.addEventListener('click', async(event)=> {
    if (event.target.tagName === 'LI') {
        const id = event.target.getAttribute('shop-id');
        await axios.delete(`/api/shops/${id}`)
        init();
    }
})

const init = async() => {
    const shops = (await axios.get('/api/shops')).data;
    const html = shops.map(shop => {
        return `<li shop-id='${shop.id}'> ${shop.name} </li>`}).join('');

    ul.innerHTML = html;
}

init();
