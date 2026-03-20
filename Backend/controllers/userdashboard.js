import { UserModel } from '../models/AuthSchema.js'


export const GetUserDashboard = async (req, res) => {
    try {
        const userId = req.userId
        const user = await UserModel.findById(userId)
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({
            message: 'Failed to get user data'
        })
        console.log(error)
    }
}



export const UserDashBoard = async (req, res) => {
    try {
        const { updatedname } = req.body
        const userId = req.userId;
        let imageUrl = null;

        if(req.file){
            imageUrl = req.file.path;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(userId, {
            ...(updatedname && {username: updatedname}),
            ...(imageUrl && {avatar: imageUrl}),
            
        },
        {new: true}
    )

    res.status(200).json({
            message: 'data saved successfully',
            user: updatedUser   
        })

        
    } catch (error) {
        res.status(400).json({
            message: 'Failed to save data'

        })

        console.log(error)
    }

}



