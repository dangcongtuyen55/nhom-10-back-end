const Work = require('../models/Work');


exports.getAllWork = async (req, res, next) => {
    try {
        const work = await Work.find({}).populate('author','username').select('fromdate todate reason registrationfor description createdAt');
        res.status(200).json({
            status: 'success',
            results:work.length,
            data:{work}
        })
    } catch (error) {
        res.json(error);
    }
}


exports.createOneWork = async (req, res, next) => {
    try {
        const {userId} = req.user;
        const works = await Work.create({...req.body, author: userId});

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
            data:{work} 
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

