'use strict'

/* Chamado o model que foi gerado que já está vinculado ao banco postgres */
const Task = use('App/Models/Task');
const { validateAll } = use('Validator');

class TaskController {
    async index({ view }) {
        const tasks = await Task.all()

        return view.render('tasks', {
            titulo: 'Lastest tasks',
            title: tasks.toJSON()
        })
    }

    /* Criando função asincrona para adicionar novas tarefas no postgres */
    async store({ request, response, session }) {

        const message = {
            'title.required': 'Required',
            'title.min': 'min 3'

        }

        //Caracteres minimos
        const validation = await validateAll(request.all(request.all()), {
            title: "required|min:5|max:140",
            body: "required|min:10"
        }, message)


        //Caso o minimo não esteja de acordo o mesmo retorna ao add task
        if (validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        const task = new Task()

        task.title = request.input('title')
        task.body = request.input('body')

        await task.save()

        session.flash({ notification: "Task added !" })

        return response.redirect('/tasks')
    }

    //Função que pega os detalhes da task(Detail of task)
    async detail({ params, view }) {
        const task = await Task.find(params.id)
        return view.render('detail', {
            task: task
        })

    }

    //Removendo a tarefa (Remove the task)
    async remove({ params, response, session }) {
        const task = await Task.find(params.id);
        await task.delete();
        session.flash({ notification: 'Task removed!' })

        return response.redirect('/tasks')
    }

}



module.exports = TaskController