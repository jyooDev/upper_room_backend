class SermonsController{
    create(){
        return "CREATE SERMON";
    }

    read(orgId : string | undefined ){
        return orgId ? `LIST ORG ${orgId} SERMON` : "LIST ALL SERMON";
    }

    update(){
        return "UPDATE SERMON";
    }

    delete(){
        return "DELETE SERMON";
    }
}

export default SermonsController;