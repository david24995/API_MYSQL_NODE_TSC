import { Request, Response } from "express";
import { connect } from "../database";
import { Post } from '../interfaces/post.interface';


export async function getPosts( req : Request, res : Response ) : Promise<Response> {

    const cnn = await connect();
    
    const posts = await cnn.query("SELECT * FROM posts");

    return res.json(posts[0]);

}

export async function createPost( req : Request , res : Response ) : Promise<Response> {

    const newPost : Post = req.body;
    
    const cnn = await connect();

    await cnn.query("INSERT INTO posts SET ? ", [newPost]);

    return res.json({message: 'Post created'});

}


export async function getPost( req : Request, res : Response ) : Promise<Response> {
   
    const { id } = req.params;

    const cnn = await connect();

    const posts = await cnn.query( "SELECT * FROM posts WHERE id = ?", [id] );

    return res.json(posts[0]);
}

export async function deletePost( req : Request, res : Response ) : Promise<Response> {
   
    const { id } = req.params;

    const cnn = await connect();

    await cnn.query("DELETE FROM posts WHERE id = ?", [id]);

    return res.json({message: 'Post deleted'});
}

export async function updatePost( req : Request, res : Response ) : Promise<Response> {
   
    const newPost : Post = req.body;

    const { id } = req.params;

    const cnn = await connect();

    await cnn.query(" UPDATE posts SET ? WHERE id = ? ", [newPost, id]);

    return res.json({ message : 'Post Updated' });
}