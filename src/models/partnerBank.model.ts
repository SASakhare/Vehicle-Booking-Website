import mongoose from "mongoose";

interface IPartnerBank {
    owner: mongoose.Types.ObjectId
    accountHolder: string,
    accountNumber: string,
    ifsc: string,
    upi:string,
    status:"not_added"|"added"|"verified",
    createdAt: Date,
    updateAt: Date,
}





const partnerBankSchema = new mongoose.Schema<IPartnerBank>({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    accountHolder:{
        type:String,
        required:true,
    },
    accountNumber:{
        type:String,
        required:true,
    },
    ifsc: String,

    status: {
        type: String,
        enum: ["not_added","added","verified"],
        default: "not_added"
    },


}, {
    timestamps: true
})


const PartnerBank = mongoose.models.PartnerBank || mongoose.model("PartnerBank", partnerBankSchema)

export default PartnerBank











