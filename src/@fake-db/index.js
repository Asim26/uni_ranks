import './db/auth-db';
import './db/calendar-db';
import './db/chat-db';
import './db/contacts-db';
import './db/invoices-db';
import './db/knowledge-base-db';
import './db/mail-db';
import './db/notes-db';
import './db/profile-db';
import './db/quick-panel-db';
import './db/search-db';
import './db/todo-db';
import mock from './mock';

mock.onAny().passThrough();
