
const validCreateProduct = (req, res, next)=>{
    const {name, description, characteristics, released, price, stock,images, category, sizes,  discipline, genre, trademarck}= req.body;
    if(!name){return res.status(400).json({error: 'Missing name'})};
    if(!description){return res.status(400).json({error: 'Missing description'})};
    if(!characteristics){return res.status(400).json({error: 'Missing characteristics'})};
    if(!released){return res.status(400).json({error: 'Missing released'})};
    if(!price){return res.status(400).json({error: 'Missing price'})};
    if(!stock){return res.status(400).json({error: 'Missing stock'})};
    if(!images){return res.status(400).json({error: 'Missing images'})};
    if(!category){return res.status(400).json({error: 'Missing category'})};
    if(!sizes){return res.status(400).json({error: 'Missing sizes'})};
    if(!discipline){return res.status(400).json({error: 'Missing discipline'})};
    if(!genre){return res.status(400).json({error: 'Missing genre'})};
    if(!trademarck){return res.status(400).json({error: 'Missing trademarck'})};
    next ();

};

export default validCreateProduct;