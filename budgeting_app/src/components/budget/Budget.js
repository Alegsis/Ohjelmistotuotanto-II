import TreeView from '@mui/lab/TreeView';
import TreeItem, {treeItemClasses} from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ChevronRight} from '@mui/icons-material';
import Axios from 'axios';
import {useEffect} from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {styled} from '@mui/material';

const Budget = () => {

  const [categoryArray, setCategoryArray] = useState([]);

  const StyledTreeItem = styled(TreeItem)(({theme}) => ({
    [`& .${treeItemClasses.label}`]: {
      border: 'solid skyblue 1px',
      minWidth: 300,
      borderRadius: theme.shape.borderRadius,
      marginTop: 8,
      marginBottom: 8,
      backgroundColor: 'powderblue',
    },
  }));

  const GetCategoriesSubcategories = () => {

    const userID = localStorage.getItem('UserID');
    const baseUrl = `http://localhost:3001/category/${userID}/return-category-dictionary`;

    Axios.get(baseUrl).then((res) => {

      setCategoryArray(res.data);

    }).catch((error) => {

      alert(error);

    });
  };

  useEffect(() => {
    return () => {
      GetCategoriesSubcategories();
    };
  });

  const categoriesAndSubsList = (treeItems) => {
    return treeItems.map((treeItemData) => {
      let children;
      if (treeItemData.subcategory && treeItemData.subcategory.length > 0) {
        children = categoriesAndSubsList(treeItemData.subcategory);
      }
      if (treeItemData.route) {
        return (
            <Link to {...treeItemData.route}>
              <StyledTreeItem
                  key={treeItemData.category}
                  nodeId={treeItemData.category}
                  label={'Category name: ' + treeItemData.category +
                      'Balance: ' + treeItemData.balance}
                  children={children}
              />
            </Link>
        );
      }
      return (
          <StyledTreeItem
              key={treeItemData.category}
              nodeId={treeItemData.category}
              label={treeItemData.category + ', ' +
                  'balance: ' + treeItemData.balance}
              children={children}
          />
      );
    });
  };

  return (
      <div className="budgetGrid">
        <a>Category/subcategory name and balance</a>
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRight/>}
            sx={{height: 300, flexGrow: 2, maxWidth: 800, overflowY: 'auto'}}
        >

          {categoriesAndSubsList(categoryArray)}

        </TreeView>

      </div>
  );
};

export default Budget;