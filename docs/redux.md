### Redux

#### Rule#1: Normalizaing application state

Tổ chức lưu trữ dưới dạng object/map để dễ dàng tìm kiếm và xóa khi cần thiết.

Tránh việc duplicate cùng một object. 

Bất kỳ liên kết nào đến một entity đều phải sử dụng ID, tránh object reference hay clone object. Như vậy sẽ cung cấp single source of truth cho state.

Sử dụng sage hoặc thunk để handle loading normalized data.

#### Rule#2: Entity State và View State

Lưu entity state ở global app state.

Lưu view state ở local component state và local storage. Caching ở local storage mang đến cho người dùng trải nghiệm sử dụng tốt hơn.

#### Rule#3: 

Normalize data khi lưu vào state

Denormalize ở selector để lấy ra dữ liệu hiển thị phù hợp.



Domain data: users, messages,

App state: ví dụ currentSelected

UI state: l=không nên

#### Rule#4: Naming Conventions

- action creators: **do**Something
- reducers: **apply**Something
- selectors:**get**Something
- sages: **watch**Something, **handle**Something
- ACTION_TYPES: 'Pr'

```javascript
const state = {
   domainData1: {},
   domainData2: {},
   appState1: {},
   appState2: {},
   ui: {
      uiState1: {},
      uiState2: {},
   }
}
```

```javascript
const state = {
    entities: {
        entityType1: {},
        entityType2: {},
    },
    
}

const state = {
    entities: {
        author: { byId: {}, allIds: [] },
        books: { byId: {}, allIds: [] },
        authorBook: {
        	byId: {
            	1: {
                    id:1,
                    authorId: 5,
                    bookId: 22,
                },
                2: {
                    id:2,
                    authorId: 5,
                    bookId: 15,
                },
                3: {
                },
            },
            allIds: [1,2,3],
        },
    }
}
```



####  Application state structure

```javascript
const appState = {
    // *** Domain Data *** //
   entities: {
      users: { // lưu danh sách người dùng
         "<user_id>": {
              
         },
      },
      devices: { // lưu danh sách thiết bị mà người dùng sử dụng
         "<device_id>": {
            
         },  
      },
      activities: { // lưu danh sách các hoạt động người dùng đã, đang và sẽ tham gia.
         "<activity_id>": {
             
         }  
      },
      contents: { // lưu học liệu sử dụng trong các hoạt động học. 
         "<content_id>": {
             
         }
      },
      messages: { // lưu tất cả tin nhắn mà người dùng chat với bot, friends, group
          "<message_id>": {
             
          }
      },
   },
   // *** App State *** //
   authUser: {}, // lưu thông tin người dùng đăng nhập hiện tại
   currentActivity: {
       "<activity_id>: {}, 
   },
}
```

#### 1. Content 

```javascript
const ASSETS_TYPES = {
	Image: 'Image',
    File: 'File',
    
    Audio: 'Audio',
    Video: 'Video',
    PDF: 'PDF',
    Docs: 'Docs',
    Excel: 'Excel',
    Powerpoint: 'Powerpoint',
}

const SCHEMA_TYPES = {
	Document: 'Document',
    Object: 'Object', // khong tuong ung voi mot document doc lap. Address Object
    
    String:'String', // mot dong chu
    Text: 'Text', // nhieu dong
    Markdown: 'Markdown',
    Block: 'Block', // tap hop cac doan text. Luu trong cac span va se dc dinh dang
    Span:'Span',
    Slug:'Slug', // unique string
    
    Number: 'Number',
    Boolean:'Boolean',
    Array:'Array',
    Datetime:'Datetime',
    Date:'Date',
    Reference:'Reference', // reference to a document
    Geopoint:'Geopoint',
 
    Image:'Image',
    File:'File', // reference to file asset documents. (pdf, mpeg, docs etc)
    URL:'URL',
    Iframe: 'Iframe',
 }

const CONTENT_TYPES = {
	Wiki: 'Wiki',
    Quizz: 'Quizz',
    // *** Questions *** //
    MultiChoiceQuestion: 'MultichoiceQuestion',
    SingleChoiceQuestion: 'SingleChoiceQuestion',
    TrueFalseQuestion: 'TrueFalseQuestion',
    FillInBlankQuestion: 'FillInBlankQuestion',
    MatchQuestion: 'MatchQuestion',
    OrderingQuestion: 'OrderingQuestion',
}

const Asset = { 
    // asset luu trong Firebase Storage
    // Asset Document bang Firestore
	id: { type: UUID, title:'Asset ID'}, //Mã tài nguyên
    name: {type: String, title: 'Asset Name'}, //Tên tài nguyên
    type: {type: Enum(ASSET_TYPES), title: 'Asset Type'},//Loại tài nguyên
    sourceId: {type: Reference, title: 'Source ID'}, //Nguôn tài nguyên
}

const Content = { // 
    id: { type: UUID, title:'Content ID'}, //Mã học liệu
    name: {type: String, title: 'Content Name'}, //Tên học liệu
    type: {type: Enum(CONTENT_TYPES), title: 'Content Type'},//Loại học liệu
    sourceId: {type: Reference, title: 'Source ID'}, //Nội dung tài liệu, Nguồn tài liệu
    // type + sourceId -> có thể liên kết tới đúng loại content
}

const ContentBlock = {
	title: {type: String, title: 'Title'},
    content: {type: Text, title: 'Content'},
    markdown: {type: Markdown, title: 'Markdown'},
    images: {type: Array, of:[Image], title:'Images'},
    files: {type: Array, of:[Files], title:'Files'}, // video, audio, docs
	// *** Optional *** //
	slots: [],
}
    
const contents = {
    '<content_id>': {
	}
}

const Category = {
    id: { type: UUID, title:'Category ID'},
	name: {type: Slug, title: 'Category Name'},
}

const Tag = {
    id: { type: UUID, title:'Tag ID'},
	name: {type: Slug, title: 'Tag Name'},
}

const BloomTaxonomy = {
	Facts: { Remember:true, Understand: false, Apply: false, Analyze: false, Evaluate: false, Create: false },
    Concepts: { Remember:true, Understand: false, Apply: false, Analyze: false, Evaluate: false, Create: false },
    Processes: { Remember:true, Understand: false, Apply: false, Analyze: false, Evaluate: false, Create: false },
    Procedures: { Remember:true, Understand: false, Apply: false, Analyze: false, Evaluate: false, Create: false },
    Principles: { Remember:true, Understand: false, Apply: false, Analyze: false, Evaluate: false, Create: false },
    MetaCognitive: { Remember:true, Understand: false, Apply: false, Analyze: false, Evaluate: false, Create: false },
}
```

##### 1.1 Quizz

```javascript
// Quizz
const Quizz = {
    id: { type: UUID, title:'Quizz ID'},
    contentId: {type: Reference(Content), title: 'Conten ID'},
    name: {type: String, title: 'Quizz Name'},
    type: {type: Enum(CONTENT_TYPES), value:CONTENT_TYPES.Quizz title: 'Content Type'},
    questions: {type: Array, of:[Question,'MultiChoiceQuestion'], title:'Questions'},

    bloomTaxonomy: {type:Object(BloomTaxonomy), title:'Bloom Taxonomy'} // thang Bloom
    tags: {type: array, of:[String], title: 'Tags'},
    categories: {type: array, of: ['Category'], title: 'Categories'},
}

const quizzs = {
    'quizz_id': {
        id:'',
        contentId:'',
        name:'',
        type: CONTENT_TYPES.Quizz,
        questions: ['<question_id>', '<question_id>', '<question_id>'],
    }
}
```

```javascript
// MultiChoiceQuestion

const MultiChoiceQuestion = {
	id: { type: UUID, title:'Question ID'},
    contentId: {type: Reference(Content), title: 'Conten ID'},
    type: {type: Enum(CONTENT_TYPES), value:CONTENT_TYPES.MultiChoiceQuestion, title: 'Content Type'},
    name: {type: String, title: 'Question Name'},
    question: {type:Object{ContentBlock}, title: 'Question Content'},
    answers:{type: Array, of:[QuestionAnswer], title: 'Question Answers'},

    // *** Optional ***/
    hints: {type: Array, of:[QuestionHint], title: 'Hints'},
    style: {type: Object(Style), title: 'Style'},
}

const QuestionAnswer = { // type: Object{ContentBlock}, title: 'Answer'
    isCorrect: true,
}

const QuestionHint = { // type: Object{ContentBlock}, title: 'Hint'
    afterAnswer: false,
}

const multiChoiceQuestions = {
	'<question_id>': {
    	id:'',
  		contentId: '',
        type: CONTENT_TYPES.MultiChoiceQuestion,
        question: {
        	title: 'Khẳng định nào sau đây là đúng. Chọn nhiều đáp án duy nhất.',
            /*
            image: {
                id: '',
                assetId:'',
            	type: ASSETS_TYPES.Image,
            },
            audio: {
            	id: '',
                assetId: '',
                type: ASSETS_TYPES.Audio
            }
            */
        },
        answers: [ // đảm bảo có ít nhất 1 đáp án đúng
            {
                title: 'A| Answer 1',
                content: 'Các số nguyên tố đều là sô lẻ.',
                isCorrect: false,
            },
            {
                title: 'B| Answer 2',
                content: 'Số $2$ là số nguyên tố chẵn duy nhất.',
                isCorrect: true,
            },
            {
                title: 'C| Answer 3',
                content: 'Số nguyên tố có ước là 1 và chính nó.',
                isCorrect: true,
            },
            {
                title: 'D| Answer 4',
                content: 'Các số nguyên tố lớn hơn 2 đều là số lẻ.',
                isCorrect: true,
            }
        ],
        hints: [
            {
                title: 'Hint 1',
                content: '',
                afterAnswer: false,
            },
            {
                title: 'After a student answers the question.',
                content: '',
                afterAnswer: true,
            }
        ],
    }
}
```

```javascript
// SingleChoiceQuestion
const SingleChoiceQuestion = {
    
}

const singleChoiceQuestions = {
	'<question_id>': {
    	id:'',
  		contentId: '',
        type: CONTENT_TYPES.SingleChoiceQuestion,
        question: {},
        answers: [ // dam bao co duy nhat mot dap an dung
        ],
        hints: [],
    }
}
```

```javascript
// TrueFalseQuestion
const TrueFalseQuestion = {

}

const trueFalseQuestions = {
	'<question_id>': {
    	id:'',
  		contentId: '',
        type: CONTENT_TYPES.TrueFalseQuestion,
        question: {},
        answers: [ // dam bao co dung 2 dap an
        ],
        hints: [],
    }
}
```

##### 1.2 Wiki

```javascript
// Wiki
const Wiki = {
    
}
```



#### 2. Activity

```javascript
const ACTIVITY_TYPES = {
    // Do, Play, 
    // Listen, Speak, Read, Write
	DoQuizz: 'DoQuizz',
    DoTest : 'DoTest',
}
const ACTION_TYPES = {
	ActivitiesShow: 'Activities/Show',
    ActivitiesSearch: 'Activities/Search',
    ActivitiesSuggest: 'Activities/Suggest',
    
   	ActivitySelect : 'Activity/Select',
    ActivityNext: 'Activity/Next',
    ActivityPrevious: 'Activity/Previous',
    ActivityPlay: 'Activity/Play',
    ActivityPause: 'Activity/Pause',
    
	ActivityLike: 'Activity/Like',
    ActivityRating: 'Activity/Rating',
	ActivityBookmark: 'Activity/Bookmark',
    ActivityNote: 'Activity/Note',
}

const Activity = {
	id: { type: UUID, title:'Activity ID'},
    name: { type: String, title: 'Activity Name'},
    type: {type: Enum(ACTIVITY_TYPES), title: 'Activity Type'},
    contentType: {type: Enum(CONTENT_TYPES, title: 'Content Type')},
    contentId: {type: Enum(CONTENT_TYPES, title: 'Content ID')},
    content: { type: Ref(Quizz), title : 'COntent' } 
}

const activities = {
 	"<activity_id>": {
       name: "Luyen tap ve so nguyen to",
       type: ACTIVITY_TYPES.DoQuizz,
       content: 
    }   
}
```

 #### Knownledge Tree

```javascript
// Course
```

```

```



#### 3. User & Organization

```javascript
// User Model
const GENDERS = {
	Male: 'Male',
    Female: 'Female',
    Unknown: 'Unknown',
}
const User = {
    id: { type: UUID, title:'User ID'},
    type: {type: Enum(ORGANIZATION_TYPES, 'User Type'),
    code: {type: Slug, title:'Code'},
    profile: {
        avatar: {type: Image, title: 'Avatar'},
     	name: {
            fullName: {type: String, title:'Full Name'},
            firstName: {type: String, title:'First Name'},
            middleName: {type: String, title:'Middle Name'},
            lastName: {type: String, title:'Last Name'},
            contactName: {type: String, title:'Contact Name'},
        },
        email: {type: Email, title:'Email'},
        phone: {type: Phone, title:'Phone'},
        address: {
            address: {type: String, title:'Address'},
            country: {type: Ref(Country), title:'Country'},
            city: {type: Ref(City), title:'City'},
            district: {type: Ref(District), title:'District'},
            ward: {type: Ref(Ward), title:'Ward'},
        },
        birthday: {type: Date, title:'Birthday'},
        gender: {type: ENUM(GENDERS), title:'Gender'},
    },
    providers: { // user information from auth providers
        facebook: {},
        google: {},
    },
    works: { type: Array, of(WorkObject, StudyObject), 'Works' },
    supervisors: {type: Array, of(RelObject), 'Supervisors' },
}
    
// WorkObject --- Template 1
const workObject = {
    organization: { type:Ref(Organization), ''}, //
}
// StudyObject --- Template 2
const studyObject = {
	organization: { type:Ref(Organization), name: 'Organization'}, // org id + name
    class: { type:Ref(Class), name: 'Class'}, // class id + name
    schoolYear: { type: Number, name: 'School Year'},
    isCurrent: {type: Boolean, name: 'Current'},
}

const RelObject = {
    supervisor: {type: Ref(User), title: 'Supervisor'},
    relationship: {type: String, title: 'Relationship'},
}

// User Actions

// *** Example ***//
const users = {
 	'<user_id>': {
        
    }
}
```

```javascript
// Organization
const ORGANIZATION_TYPES = {
    School: 'School',
    Company: 'Company',
}

const Organization = {
    id: { type: UUID, title:'Organization ID'},
    type: {type: Enum(ORGANIZATION_TYPES), value:ORGANIZATION_TYPES.School, title: 'Organization Type'},
    code: {type: Slug, title:'Code'},
    profile: {
        name: {
        	fullName: {type: String, title:'Full Name'},
            shortName: {type: String, title:'Short Name'},
  		},
    	email: {type: Email, title:'Email'},
        phone: {type: Phone, title:'Phone'},
        address: {
            address: {type: String, title:'Address'},
            country: {type: Ref(Country), title:'Country'},
            city: {type: Ref(City), title:'City'},
            district: {type: Ref(District), title:'District'},
            ward: {type: Ref(Ward), title:'Ward'},
        },
    },
   
}

// Utils
const Country = {
    id: { type: UUID, title:'Organization ID'},
    code: { type: Slug, title:'Country Code'},
    name: { type: String, title:'Country Name'},
    // abbreviation: { type: String, title:''},
    location: { type: Geopoint, title: 'Location'},
}

const City = {
	id: { type: UUID, title: 'City ID'},
    code: { type: Slug, title: 'City Code'},
    name: { type: String, title: 'City Name'},
    country : {type: Ref(Country), title: 'Country'},
    location: { type: Geopoint, title: 'Location'},
}

const District = {
    id: { type: UUID, title: 'District ID'},
    code: { type: Slug, title: 'District Code'},
    name: { type: String, title: 'District Name'},
    country : {type: Ref(Country), title: 'Country'},
    city : {type: Ref(City), title: 'City'},
    location: { type: Geopoint, title: 'Location'},
}

const Ward = {
    id: { type: UUID, title: 'Ward ID'},
    code: { type: Slug, title: 'Ward Code'},
    name: { type: String, title: 'Ward Name'},
    country : {type: Ref(Country), title: 'Country'},
    city : {type: Ref(City), title: 'City'},
    district : {type: Ref(District), title: 'District'},
    location: { type: Geopoint, title: 'Location'},
}

// *** Example *** //
const organizations = {
    
}
```

```javascript
// Class

```

