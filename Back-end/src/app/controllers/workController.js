const Work = require('../models/Work');


exports.getAllWork = async (req, res, next) => {
    try {
        const work = await Work.find({})
        res.status(200).json({
            status: 'success',
            results:work.length,
            works:work
        })
    } catch (error) {
        res.json(error);
    }
}

exports.getWorkById = async(req, res, next)=>{
    try {
        const {workId} = req.params;
        const work = await Work.findById(workId,{...req.body});
        res.status(200).json({
            status: 'success',
            works:work
        })
    } catch (error) {
        res.json(error);
    }
}


exports.createOneWork = async (req, res, next) => {
    try {
        const {userId} = req.user;
        const works = await Work.create({...req.body});

        res.status(200).json({
            status: 'success',
            data:{works} 
        })

    } catch (error) {
        res.json(error)
    }
}

exports.updateOneWork = async (req, res, next) => {
    try {
        const {workId} = req.params;
        const work = await Work.findByIdAndUpdate(workId, {...req.body},{new: true, runValidator:true});

        res.status(200).json({
            status: 'success',
            works:{work} 
        })
    } catch (error) {
        res.json(error)
    }
}

exports.deleteOneWork = async (req, res, next) =>{
    try {
        const {workId} = req.params;
        await Work.findByIdAndDelete(workId);

        res.status(200).json({
            status: 'success',
            message: 'Work deleted successfully'
        })
    } catch (error) {
        res.json(error)
    }
}

