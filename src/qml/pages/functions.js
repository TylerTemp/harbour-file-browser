
// Go to root using the optional operationType parameter
// @param operationType PageStackAction.Immediate or Animated, Animated is default)
function goToRoot(operationType)
{
    if (operationType !== PageStackAction.Immediate &&
            operationType !== PageStackAction.Animated)
        operationType = PageStackAction.Animated;

    // find the first page
    var firstPage = pageStack.previousPage();
    if (!firstPage)
        return;
    while (pageStack.previousPage(firstPage)) {
        firstPage = pageStack.previousPage(firstPage);
    }

    // pop to first page
    pageStack.pop(firstPage, operationType);
}

// returns true if string s1 starts with string s2
function startsWith(s1, s2)
{
    if (!s1 || !s2)
        return false;

    var start = s1.substring(0, s2.length);
    return start === s2;
}

function goToFolder(folder)
{
    goToRoot(PageStackAction.Immediate);

    // open the folders one by one
    var dirs = folder.split("/");
    var path = "";
    for (var i = 1; i < dirs.length; ++i) {
        path += "/"+dirs[i];
        // animate the last push
        var action = (i < dirs.length-1) ? PageStackAction.Immediate : PageStackAction.Animated;
        pageStack.push(Qt.resolvedUrl("DirectoryPage.qml"), { dir: path }, action);
    }
}

// Goes to Home folder
function goToHome()
{
    goToFolder(engine.homeFolder());
}

function sdcardPath()
{
    return "/run/user/100000/media/sdcard";
}

function androidSdcardPath()
{
    return "/data/sdcard";
}

function formatPathForTitle(path)
{
    if (path === "/")
        return "File Browser: /";

    var i = path.lastIndexOf("/");
    if (i < -1)
        return path;

    return path.substring(i+1)+"/";
}

function lastPartOfPath(path)
{
    if (path === "/")
        return "";

    var i = path.lastIndexOf("/");
    if (i < -1)
        return path;

    return path.substring(i+1);
}

function formatPathForSearch(path)
{
    if (path === "/")
        return "root";

    var i = path.lastIndexOf("/");
    if (i < -1)
        return path;

    return path.substring(i+1);
}

function unicodeArrow()
{
    return "\u2192"; // unicode for arrow symbol
}

function unicodeBlackDownPointingTriangle()
{
    return "\u25bc"; // unicode for down pointing triangle symbol
}
