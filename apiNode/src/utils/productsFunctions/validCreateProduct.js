
const validCreateProduct = (req, res, next)=>{
    const {name, description, released, category, discipline, genre, trademarck, variants}= req.body;
    if(!name){return res.status(400).json({error: 'Missing name'})};
    if(!description){return res.status(400).json({error: 'Missing description'})};
    if(!released){return res.status(400).json({error: 'Missing released'})};
    if(!category){return res.status(400).json({error: 'Missing category'})};
    if(!discipline){return res.status(400).json({error: 'Missing discipline'})};
    if(!genre){return res.status(400).json({error: 'Missing genre'})};
    if(!trademarck){return res.status(400).json({error: 'Missing trademarck'})};
    if(!variants){return res.status(400).json({error: 'Missing variants'})};
   
    next ();

};

export default validCreateProduct;