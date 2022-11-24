const getNumId = async (targetId, modelName = '') => {
    if(targetId){
        const Model = require('./../server/models/'+modelName);
        const countGTrecords = await Model.find({_id: {$lt: targetId}}).count()+501;
        return countGTrecords;
    }else{
        return 'Loading...';
    }
};

module.exports = getNumId;