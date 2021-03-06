import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import { renderFile } from 'ejs';

import indexRouter from './routes/index.js';
import actionsRouter from './routes/api/actions.js';
import sequencesRouter from './routes/api/sequences.js';

const app = express();

// view engine setup
app.set('views', path.join('.', 'views'));
app.engine('html', renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join('.', 'public')));

app.use('/', indexRouter);
app.use('/api/actions', actionsRouter);
app.use('/api/sequences', sequencesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;