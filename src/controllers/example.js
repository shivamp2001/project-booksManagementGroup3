const bookModel=require('../models/bookModel')
const reviewModel=require('../models/reviewModel')

exports. getbook= async()=>{
    try{let bookid=req.params
        const allreviews=await reviewModel.find({_id:bookid,isdeleted:false}).select({isdeleted:0,_v:0,createdAt:0,updatedAt:0})

        const book=await bookModel.findOne({_id:bookid,isdeleted:false}).lean()
        book.reviewdata=allreviews
        book.revews=allreviews.length

        return res.status(200).send({status :true,data:books})

    }catch(err){
      return res.status(500).send({status:false,error:err.message})
    }
}