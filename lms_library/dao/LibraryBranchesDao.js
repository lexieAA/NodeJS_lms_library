const db = require("./db").getDb();

exports.getAllLibraryBranches = async () =>{
  let branches = await db.query('select * from library.tbl_library_branch order by branchName');
      return branches;
};

exports.getBranchesLikes = async (branchName) =>{
  let branches = await db.query('select * from library.tbl_library_branch where branchName like ? order by branchName',['%' + branchName +'%']);
      return branches;
};

exports.getLibraryBranchById = async (branchId) =>{
  let branch = await db.query('select * from library.tbl_library_branch where branchId = ?', [branchId]);
      return branch;
};

exports.updateLibraryBranch = async (branchId, branchName, branchAddress) =>{
  let update = await db.query('update library.tbl_library_branch set branchName = ?, branchAddress = ? where branchId = ?', [branchName, branchAddress, branchId]);
    return update;
};