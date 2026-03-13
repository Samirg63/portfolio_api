import { db } from "./sqlite"
import { DataTypes } from "sequelize"



export const userModel = db.define('user',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type:DataTypes.TEXT,
        allowNull:false
    }
    ,
    password:{
        type:DataTypes.TEXT,
        allowNull:false
    }
    ,
    name:{
        type:DataTypes.TEXT,
        allowNull:false
    }
    ,
    subtitle:{
        type:DataTypes.TEXT,
        allowNull:false
    }
    ,
    image:{
        type:DataTypes.TEXT,
        allowNull:false
    }
    ,
    secondImage:{
        type:DataTypes.TEXT
    },
    curriculum:{
        type:DataTypes.TEXT
    }
});

export const aboutModel = db.define('about',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    image:{
        type:DataTypes.STRING
    },
    text:{
        type:DataTypes.TEXT,
        allowNull:false
    }
});

export const contactModel = db.define('contact',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    whatsapp:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    github:{
        type:DataTypes.TEXT
    },
    linkedIn:{
        type:DataTypes.TEXT
    },
    sectionTitle:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    sectionSubtitle:{
        type:DataTypes.TEXT,
        allowNull:false
    }
});

export const hardskillsGroupsModel = db.define('hardskillsGroups',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.TEXT,
        allowNull:false
    }
});

export const hardskillsModel = db.define('hardskill',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    icon:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    hardskillsGroupId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:hardskillsGroupsModel,
            key:'id'
        }
    },
    order:{
        type:DataTypes.INTEGER
    }
});


export const tagsGroupModel = db.define('tagsGroup',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    color:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export const tagsModel = db.define('tags',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    tagGroupId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:tagsGroupModel,
            key:'id'
        }
    },
    name:{
        type:DataTypes.TEXT,
        allowNull:false
    }
});

export const projectsModel = db.define('projects',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    desc:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    images:{
        type:DataTypes.STRING,
        allowNull:false
    },
    coverImage:{
        type:DataTypes.NUMBER,
        defaultValue:0
    },
    projectLink:{
        type:DataTypes.TEXT
    },
    githubLink:{
        type:DataTypes.TEXT
    }
});

export const tokensModel = db.define('token',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    token:{
        type:DataTypes.STRING,
        allowNull:false
    },
    expire:{
        type:DataTypes.DATE,
        allowNull:false
    }
})


//tabelas de relacionamento

export const projectTagsModel = db.define('projectTags',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    projectId:{
        type:DataTypes.INTEGER,
        allowNull:false, 
        references:{
            model:projectsModel,
            key:'id'
        }
    },
    tagId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:tagsModel,
            key:'id'
        }
    }
})