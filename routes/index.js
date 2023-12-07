import express from "express";
import { getUsers, Register, Login, logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { addUniversity } from '../controllers/universitas.js';
import {getAllBooks,addBuku,getBookById,deleteBookById,updateBookById} from '../controllers/buku.js';
import {getAllCategories,addCategory,getCategoryById,deleteCategoryById,updateCategoryById
} from "../controllers/category.js";
import {getAllRequests,addRequest,getRequestById,deleteRequestById,updateRequestById,} from '../controllers/request.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/users', verifyToken, Register);
router.post('/Login', Login);
router.get('/token', refreshToken);
router.delete('/logout', logout);
router.post('/universities', addUniversity);
router.get('/buku', getAllBooks);
router.post('/buku', addBuku);
router.get('/buku/:id', getBookById);
router.delete('/buku/:id', deleteBookById);
router.put('/buku/:id', updateBookById);
router.get("/categories", getAllCategories);
router.post("/categories", addCategory);
router.get("/categories/:id", getCategoryById);
router.delete("/categories/:id", deleteCategoryById);
router.put("/categories/:id", updateCategoryById);
router.get('/requests', getAllRequests);
router.post('/requests', addRequest);
router.get('/requests/:id', getRequestById);
router.delete('/requests/:id', deleteRequestById);
router.put('/requests/:id', updateRequestById);

export default router;
