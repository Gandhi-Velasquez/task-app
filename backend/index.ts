import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import * as middleware from './middleware';
import { Firestore } from '@google-cloud/firestore';

const dbInstance = new Firestore();

const env = process.env.NODE_ENV || 'development';

type TaskData = {
  title?: string;
  column?: string;
  type?: string;
  created_at?: string;
  priority?: number;
}

type NewTask = {
  title: string;
  column: string;
  type: string;
  priority: number;
  created_at: string;
}

type TaskDocument = {
  id: string;
  data: TaskData;
}
  
export async function doGetTask(req: Request, res: Response): Promise<void> {
  try {
    const now: string = new Date().toISOString();
    const tdocs = await req.db.collection('task').get();
    const list: TaskDocument[] = [];

    tdocs.docs.forEach((doc) => {
      const data = doc.data() as TaskData;
      list.push({ id: doc.id, data });
    });

    res.json({
      tasks: list,
      now,
    });
  } catch (e) {
    console.error('Error fetching tasks:', e);
    res.status(500).json({ e: 'Internal Server Error' });
  }
}

export async function doCreateTask(req: Request, res: Response): Promise<void> {
  try {
    const task_data: NewTask = req.body;
    const created_at: string = new Date().toISOString();
    task_data.created_at = created_at

    const docRef = await req.db.collection('task').add(task_data);

    res.json({
      id: docRef.id,
      data: task_data
    });
  } catch (e) {
    console.error('Error creating task:', e);
    res.status(500).json({ e: 'Internal Server Error' });
  }
}

export async function doUpdateTask(req: Request, res: Response): Promise<void> {
  try {
    const task_id: string = req.params.id;
    const updatedTaskData: TaskData = req.body;

    await req.db.collection('task').doc(task_id).set(updatedTaskData, { merge: true });

    res.json({
      id: task_id,
    });
  } catch (e) {
    console.error('Error updating task:', e);
    res.status(500).json({ e: 'Internal Server Error' });
  }
}

export async function doDeleteTask(req: Request, res: Response): Promise<void> {
  try {
    const task_id: string = req.params.id;

    await req.db.collection('task').doc(task_id).delete();

    res.json({
      id: task_id,
      now: new Date().toISOString(),
    });
  } catch (e) {
    console.error('Error deleting task:', e);
    res.status(500).json({ e: 'Internal Server Error' });
  }
}

if (require.main === module) {
  (async () => {
    const app: Express = express();
    app.use(express.json());
    app.use(cors({ origin: true }));

    app.get('/tasks', doGetTask)
    app.post('/task', doCreateTask)
    app.put('/task/:id', doUpdateTask)
    app.delete('/task/:id', doDeleteTask)

    const api: Express = express();
    api.set('etag', false);
    app.set('etag', false);

    middleware.configure(api, dbInstance);

    api.use('/api', app);

    const port = process.env.PORT || 3000;
    api.listen(port, () =>
      console.log(
        'lonche.app backend [' + env + '] listening on https',
        port,
      ),
    );
  })();
}
