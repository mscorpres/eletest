

const openPageUrl = async (pageId) => {

    switch (pageId) {
        case 'genAtt':
            require('./newWindowOpen.js')({
                pageUrl: "./pages/attendance.ejs",
                title: 'Attendance',
                width: 800,
                height: 100,
                resizable: false,
                minimizable: false,
                alwaysOnTop: true,
                pageId: pageId
            })
    }
    
}

module.exports = openPageUrl