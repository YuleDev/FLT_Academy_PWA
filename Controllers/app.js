/**
 * FLT ACADEMY STUDENT PORTAL - CORE CONTROLLER
 * This file manages client-side routing, UI rendering, and the logic for 
 * aviation-specific tools like Weight & Balance and offline form processing.
 */

const app = document.getElementById('app');

// ==========================================================
// 1. NAVIGATION & ROUTING ENGINE
// ==========================================================

/**
 * High-performance UI templates stored as literal strings.
 * Templates are rendered on-demand to maintain "Internet Independence."
 */
const routes = {
    'home': () => `
        <section class="app-grid">
            ${renderAppIcon('reimbursement', 'Fuel', 'M18 3c.55 0 1 .45 1 1v9l-2 3V4h-9v16h5v2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h12m0 12.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5M18 19c1.1 0 2 .9 2 2v1h-4v-1c0-1.1.9-2 2-2z')}
            ${renderAppIcon('asap', 'ASAP', 'M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z')}
            ${renderAppIcon('availability', 'Availability', 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zM12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z')}
            ${renderAppIcon('checkride', 'Checkride', 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z')}
            ${renderAppIcon('student-request', 'Students+', 'M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z')}
            ${renderAppIcon('training-center', 'Transfer', 'M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" transform="rotate(90 12 12)')}
            ${renderAppIcon('new-instructor', 'Instructor', 'M16 9c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2 4c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zM9 9c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm3 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z')}
            ${renderAppIcon('stage-check', 'Stage Check', 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z')}
            ${renderAppIcon('dispatch', 'Dispatch', 'M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z')}
            ${renderAppIcon('settings', 'Settings', 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z')}
        </section>
    `,
    'reimbursement': () => renderForm('Fuel', `
        <form id="reimbursement-form" onsubmit="handleForm(event, 'REIMBURSEMENT')">
            <input type="text" name="studentName" placeholder="Student Name" required>  
            <input type="email" name="Email" placeholder="Student Email" required>
            <input type="number" name="gallons" placeholder="Gallons" inputmode="decimal" required>
            <input type="number" name="cost" placeholder="Total Cost" inputmode="decimal" required>
            <input type="text" name="location_fueled" placeholder="Location Fueled" required>
            <input type="text" name="nNumber" placeholder="Aircraft N-Number" required>
            <select name="reimbursementType" required>
                <option value="Mailed">Check (Mailed)</option>
                <option value="In Person">Check (In Person)</option>
            </select>
            <p class="form-label">Receipt Photo:</p>
            <input type="file" id="receipt-photo" accept="image/*" capture="camera">
            <button type="submit" class="submit-btn">SAVE REIMBURSEMENT</button>
        </form>
    `),
    'asap': () => renderForm('ASAP', `
        <p style="font-size: 0.85rem; margin-bottom: 15px; color: #666;">Identify for immunity or leave blank for anonymity.</p>
        <form onsubmit="handleForm(event, 'ASAP')">
            <input type="text" name="name" placeholder="Name (Optional)">
            <input type="email" name="email" placeholder="Email (Optional)">
            <input type="tel" name="Phone" placeholder="Phone Number (Optional)">
            <textarea name="message" placeholder="Describe the safety concern..." required></textarea>
            <button type="submit" class="submit-btn">SUBMIT ASAP REPORT</button>
        </form>
    `),
    'availability': () => renderForm('Schedule', `
        <form onsubmit="handleForm(event, 'AVAILABILITY')">
            <input type="text" name="studentName" placeholder="Student Name" required>
            <input type="text" name="instructorName" placeholder="Instructor Name" required>
            <p class="form-label">Daily Block Times (e.g. 0800-1200):</p>
            <div class="availability-grid">
                ${['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(day => 
                    `<input type="text" name="${day}" placeholder="${day.charAt(0).toUpperCase() + day.slice(1)}">`
                ).join('')}
            </div>
            <button type="submit" class="submit-btn">UPDATE AVAILABILITY</button>
        </form>
    `),
    'checkride': () => renderForm('Checkride', `
        <form onsubmit="handleForm(event, 'CHECK_REPORT')">
            <input type="text" name="student" placeholder="Student Name" required>
            <input type="email" name="studentEmail" placeholder="Student Email" required>
            <input type="text" name="instructor" placeholder="Instructor Name" required>
            <p class="form-label">Rating & Aircraft Details:</p>
            <select name="checkType" required>
                <option value="Private">Private Pilot</option>
                <option value="Instrument">Instrument</option>
                <option value="Commercial">Commercial</option>
                <option value="CFI">CFI / CFII</option>
            </select>
            <select name="airplane" required>
                <option value="Sport Cruiser">Sport Cruiser</option>
                <option value="DA-20">DA-20</option>
                <option value="DA-40">DA-40</option>
                <option value="DA-42">DA-42</option>
            </select>
            <input type="date" name="dateOfCheckride" required>
            <input type="text" name="examinerName" placeholder="Examiner Name" required>
            <select name="result" required>
                <option value="Passed">Passed</option>
                <option value="Failed">Failed</option>
                <option value="Discontinued">Discontinued</option>
            </select>
            <textarea name="difficultQuestions" placeholder="What questions were difficult?" required></textarea>
            <textarea name="oralDetails" placeholder="Oral portion details..." required></textarea>
            <textarea name="flightDetails" placeholder="Flight portion details..." required></textarea>
            <div class="radio-group">
                <p>Adequately prepared by FLT?</p>
                <label><input type="radio" name="prepared" value="Yes" required> Yes</label>
                <label><input type="radio" name="prepared" value="No"> No</label>
            </div>
            <button type="submit" class="submit-btn">SAVE CHECKRIDE REPORT</button>
        </form>
    `),
    'student-request': () => renderForm("Request Add'l Students", `
        <form onsubmit="handleForm(event, 'STUDENT_REQUEST')">
            <input type="text" name="instructorName" placeholder="Instructor Name" required>
            <input type="email" name="instructorEmail" placeholder="Instructor Email" required>
            <input type="tel" name="instructorPhone" placeholder="Instructor Phone" required>
            <input type="number" name="instructorWeight" placeholder="Instructor Weight (lbs)" required>
            <p class="form-label">Full Time Students Requested:</p>
            <select name="fullTimeCount" required>
                ${['Zero', 'One', 'Two', 'Three', 'Four'].map(v => `<option value="${v}">${v}</option>`).join('')}
            </select>
            <p class="form-label">Part Time Students Requested:</p>
            <select name="partTimeCount" required>
                ${['Zero', 'One', 'Two', 'Three', 'Four'].map(v => `<option value="${v}">${v}</option>`).join('')}
            </select>
            <p class="form-label">Instructor's Current Location:</p>
            <select name="location" required>
                <option value="BTF">BTF (Skypark)</option>
                <option value="PVU">PVU (Provo)</option>
                <option value="SPK">Spanish Fork</option>
            </select>
            <textarea name="justification" placeholder="Current load, graduation, etc." required></textarea>
            <button type="submit" class="submit-btn">SUBMIT REQUEST</button>
        </form>
    `),
    'training-center': () => renderForm('Transfer Center', `
        <form onsubmit="handleForm(event, 'TRANSFER_REQUEST')">
            <input type="text" name="name" placeholder="Full Name" required>
            <input type="email" name="email" placeholder="Email Address" required>
            <p class="form-label">Desired Transfer Location:</p>
            <select name="targetLocation" required>
                <option value="Bountiful">Bountiful (Skypark)</option>
                <option value="Ogden">Ogden</option>
                <option value="Provo">Provo</option>
                <option value="French Valley">French Valley - CA</option>
            </select>
            <textarea name="message" placeholder="Reason for Transfer" required></textarea>
            <button type="submit" class="submit-btn">SUBMIT TRANSFER</button>
        </form>
    `),
    'new-instructor': () => renderForm('Request Instructor', `
        <form onsubmit="handleForm(event, 'INSTRUCTOR_CHANGE')">
            <input type="text" name="studentName" placeholder="Your Full Name" required>
            <input type="email" name="studentEmail" placeholder="Your Email" required>
            <p class="form-label">Current Training Info:</p>
            <input type="text" name="currentInstructor" placeholder="Current Instructor Name" required>
            <p class="form-label">Reason for Request:</p>
            <textarea name="reason" placeholder="Scheduling, teaching style, etc." required></textarea>
            <p class="form-label">Desired Availability:</p>
            <textarea name="availability" placeholder="Days/Times available for a new instructor" required></textarea>
            <button type="submit" class="submit-btn">SUBMIT REQUEST</button>
        </form>
    `),
    'stage-check': () => renderForm('Stage Check', `
        <form onsubmit="handleForm(event, 'STAGE_CHECK')">
            <p class="form-label">Student Information</p>
            <input type="text" name="studentName" placeholder="Student Name" required>
            <input type="number" name="studentFTN" placeholder="Student FTN" required>
            <input type="text" name="studentCert" placeholder="Student Pilot Certificate #" required>
            <input type="tel" name="studentPhone" placeholder="Student Phone" required>
            <input type="email" name="studentEmail" placeholder="Student Email" required>
            <input type="number" name="studentWeight" placeholder="Student Weight (lbs)" required>
            <p class="form-label">Instructor Information</p>
            <input type="text" name="instructorName" placeholder="Instructor Name" required>
            <input type="number" name="instructorFTN" placeholder="Instructor FTN" required>
            <input type="text" name="instructorCert" placeholder="Instructor Certificate #" required>
            <input type="tel" name="instructorPhone" placeholder="Instructor Phone" required>
            <input type="email" name="instructorEmail" placeholder="Instructor Email" required>
            <p class="form-label">Checkride Details</p>
            <select name="checkType" required>
                <option value="Private">Private</option>
                <option value="Instrument">Instrument</option>
                <option value="Commercial">Commercial</option>
                <option value="CFI Initial">CFI Initial</option>
            </select>
            <select name="aircraft" required>
                <option value="Sport Cruiser">Sport Cruiser</option>
                <option value="DA-20">DA-20</option>
                <option value="DA-40">DA-40</option>
                <option value="DA-42">DA-42</option>
            </select>
            <p class="form-label">Location & Date</p>
            <select name="location" required>
                <option value="KBTF">KBTF (Skypark)</option>
                <option value="KSPK">KSPK (Spanish Fork)</option>
            </select>
            <label class="form-label">Date of Stage Check:</label>
            <input type="date" name="finalStageDate" required>
            <textarea name="additionalInfo" placeholder="Additional Information"></textarea>
            <textarea name="availability" placeholder="Schedule Availability" required></textarea>
            <button type="submit" class="submit-btn">SUBMIT STAGE CHECK</button>
        </form>
    `),
    'dispatch': () => renderForm('Dispatch', `
    <form onsubmit="handleForm(event, 'DISPATCH')">
        <p class="form-label">Aircraft Information</p>
        <select name="aircraft" id="aircraft-type" required onchange="updateAircraftData()">
            <option value="DA-40">DA-40</option>
            <option value="DA-20">DA-20</option>
            <option value="Sportcruiser">Sportcruiser</option>
            <option value="DA-42">DA-42</option>
            <option value="Cessna 172">Cessna 172</option>
        </select>
        
        <select name="tailNumber" id="tail-number" required>
            <option value="">Select Tail Number</option>
            ${['638DS', '134PS', '104JA', '156PS', '745DS', '525ST', '410FP', '691PS', '492DS', '22QQ', '457TL', '626Q', '236MA', 'N815DS'].map(t => `<option value="${t}">${t}</option>`).join('')}
        </select>

        <div class="wb-display">
            <span>Empty Weight: <span id="empty-w">1767.97</span></span>
            <span>Arm: <span id="empty-a">99.12</span></span>
        </div>

        <div class="availability-grid">
            <input type="number" id="w-front" name="frontSeats" placeholder="Front Seats (lbs)" oninput="calcDispatch()" required>
            <input type="number" id="w-rear" name="rearSeats" placeholder="Rear Seats (lbs)" oninput="calcDispatch()" required>
        </div>
        <div class="availability-grid">
            <input type="number" id="w-baggage" name="baggage" placeholder="Baggage (lbs)" oninput="calcDispatch()" required>
            <input type="number" id="w-ext-baggage" name="extBaggage" placeholder="Ext Baggage (lbs)" oninput="calcDispatch()" required>
        </div>
        <input type="number" id="w-fuel" name="fuelGal" placeholder="Fuel (Gallons x 6 lbs)" oninput="calcDispatch()" required>

        <div class="results-box">
            <p>Total Weight: <span id="total-w">1767.97</span> / 2646 lbs</p>
            <p>Aircraft CG: <span id="total-cg">99.12</span></p>
            <div class="radio-group" style="margin-top:10px; border:none; padding:0;">
                <label><input type="checkbox" id="check-weight" disabled> Within Weight</label>
                <label><input type="checkbox" id="check-cg" disabled> Within CG</label>
            </div>
        </div>

        <p class="form-label">Performance & Runway</p>
        <div class="availability-grid">
            <input type="number" name="toDist" placeholder="Takeoff Dist" required>
            <input type="number" name="ldDist" placeholder="Landing Dist" required>
        </div>
        <div class="availability-grid">
            <input type="number" name="runwayLength" placeholder="Runway Length" required>
            <input type="text" name="fuelEndurance" placeholder="Fuel Endurance" required>
        </div>
        <div class="availability-grid">
            <input type="number" name="densityAlt" placeholder="Density Altitude" required>
            <input type="number" name="to50" placeholder="T/O Over 50ft">
        </div>
        <input type="number" name="ld50" placeholder="Landing Over 50ft">

        <div class="radio-group">
            <label><input type="checkbox" name="certADs" required> I certify I checked Recurring ADs</label>
            <label><input type="checkbox" name="certSAs" required> I certify I checked Recurrent SAs</label>
        </div>
        <textarea name="adsDue" placeholder="Identify any ADs/SAs due within 30 days"></textarea>
        <textarea name="comments" placeholder="Instructor/Student Comments"></textarea>

        <p class="form-label">Route & Weather</p>
        <select name="scope" onchange="toggleXC(this.value)" required>
            <option value="Local">Local</option>
            <option value="X-Country">X-Country</option>
        </select>
        
        <input type="text" name="depAirport" placeholder="Departure Airport Code" required>
        <textarea name="depMetar" placeholder="Departure METAR" required></textarea>
        <textarea name="depTaf" placeholder="Departure TAF" required></textarea>
        <textarea name="depAirmets" placeholder="Departure AIRMETS/SIGMETS" required></textarea>
        <textarea name="depNotams" placeholder="Departure NOTAMS/TFRS" required></textarea>

        <div id="xc-container" style="display:none;">
            <input type="text" name="destAirport" placeholder="Destination Airport Code">
            <input type="text" name="altAirport" placeholder="Alternate Airport Code">
            <textarea name="altConditions" placeholder="Alternate Airport Conditions"></textarea>
            <textarea name="destNotams" placeholder="Destination NOTAMS/TFRS"></textarea>
        </div>

        <p class="form-label">Souls & Timing</p>
        <select name="soulsCount" required>
            <option value="">Number of Souls</option>
            ${[1,2,3,4,5,6,7,8].map(n => `<option value="${n}">${n}</option>`).join('')}
        </select>
        <textarea name="soulsNames" placeholder="Names of Souls" required></textarea>

        <div class="availability-grid">
            <div style="display:flex; gap:5px;"><input type="number" name="depH" placeholder="Dep H" required><input type="number" name="depM" placeholder="Dep M" required></div>
            <div style="display:flex; gap:5px;"><input type="number" name="retH" placeholder="Ret H" required><input type="number" name="retM" placeholder="Ret M" required></div>
        </div>
        <input type="date" name="flightDate" required>
        <label><input type="checkbox" name="nextDay"> Next Day Return?</label>

        <p class="form-label">Pilot Information</p>
        <div class="availability-grid">
            <input type="text" name="firstName" placeholder="First Name" required>
            <input type="text" name="lastName" placeholder="Last Name" required>
        </div>
        <select name="flightType" required>
            <option value="Solo">Solo</option>
            <option value="Dual">Dual</option>
        </select>
        <input type="email" name="pilotEmail" placeholder="Your Email" required>

        <div class="radio-group" style="border: 2px solid var(--flt-blue); padding: 15px;">
            <label>
                <input type="checkbox" required> 
                I certify this info is accurate and I had a CFI review it.
            </label>
        </div>

        <button type="submit" class="submit-btn">COMPLETE DISPATCH</button>
    </form>
`),
    'settings': () => renderForm('System Settings', `
    <div class="radio-group" style="border:none; background:transparent; padding:0;">
        <p class="form-label">Display Preferences</p>
        <button class="submit-btn" onclick="toggleNightMode()" style="background-color:#660000; margin-bottom:30px;">
            TOGGLE NIGHT VISION (RED)
        </button>

        <p class="form-label">Offline Access</p>
        <button class="submit-btn" onclick="toggleInstallGuide()" style="background-color:var(--flt-blue); margin-bottom:15px;">
            INSTALL TO IPAD HOME SCREEN
        </button>
        
        <div id="install-guide" style="display:none; background:#fff; color:#333; padding:15px; border-radius:12px; border:2px solid var(--flt-blue); margin-bottom:30px; font-size:0.9rem;">
            <strong style="display:block; margin-bottom:8px;">iPad Installation Steps:</strong>
            1. Tap the <strong>Share</strong> icon (square with arrow) at the top of Safari.<br>
            2. Scroll down and tap <strong>'Add to Home Screen'</strong>.<br>
            3. Tap <strong>'Add'</strong> in the top right corner.<br><br>
            <em>The app will now work 100% offline from your home screen.</em>
        </div>

        <p class="form-label">Local Database Management</p>
        <button class="submit-btn" onclick="viewQueue()" style="margin-bottom:15px; background-color:#666;">VIEW SYNC QUEUE</button>
        <button class="submit-btn" onclick="triggerManualSync()" style="background-color:#28a745;">FORCE BACKGROUND SYNC</button>
    </div>
    <div id="queue-display" style="margin-top:20px; font-size:0.9rem; background:#fff; padding:15px; border-radius:12px; display:none; border:1px solid #ccc;"></div>
`)
};

// ==========================================================
// 2. CORE ROUTING LOGIC
// ==========================================================

/**
 * Handles application state transitions.
 * Utilizes the History API for native "Back" button support.
 */

function navigate(route) {
    const viewFunc = routes[route] || routes['home'];
    app.innerHTML = viewFunc();
    window.history.pushState({}, route, `#${route}`);
}

window.onpopstate = () => {
    const route = window.location.hash.replace('#', '') || 'home';
    navigate(route);
};

// ==========================================================
// 3. AVIATION CALCULATIONS & UI HELPERS
// ==========================================================

/**
 * Real-time Weight & Balance calculator.
 * Validates aircraft center of gravity against the POH envelope.
 */
function calcDispatch() {
    const emptyW = parseFloat(document.getElementById('empty-w').innerText);
    const emptyA = parseFloat(document.getElementById('empty-a').innerText);
    
    // Pilot Inputs
    const wFront = parseFloat(document.getElementById('w-front').value) || 0;
    const wRear = parseFloat(document.getElementById('w-rear').value) || 0;
    const wBag = parseFloat(document.getElementById('w-baggage').value) || 0;
    const wFuel = (parseFloat(document.getElementById('w-fuel').value) || 0) * 6; // Standard 100LL weight

    // Standard DA-40 Station Arms
    const armFront = 90.6;
    const armRear = 128;
    const armBag = 153.1;
    const armFuel = 103.5;

    // Moment Calculations (Weight * Arm = Moment)
    const totalW = emptyW + wFront + wRear + wBag + wFuel;
    const totalM = (emptyW * emptyA) + (wFront * armFront) + (wRear * armRear) + (wBag * armBag) + (wFuel * armFuel);
    const totalCG = totalM / totalW;

    // DOM Updates
    document.getElementById('total-w').innerText = totalW.toFixed(2);
    document.getElementById('total-cg').innerText = totalCG.toFixed(2);
    
    // Range Validation
    document.getElementById('check-weight').checked = totalW <= 2646;
    document.getElementById('check-cg').checked = (totalCG >= 94.5 && totalCG <= 102);
}

/**
 * Updates tail numbers and empty weight constants for different aircraft.
 */

function updateAircraftData() {
    const type = document.getElementById('aircraft-type').value;
    const fleet = {
        'DA-40': { tails: ['745DS', '638DS', '134PS', '156PS'], w: 1767.97, a: 99.12 },
        'DA-20': { tails: ['N201FL'], w: 1150, a: 90.5 },
        'Sportcruiser': { tails: ['N701FL'], w: 850, a: 85.2 },
        'DA-42': { tails: ['N420FL'], w: 2800.00, a: 95.50 }, // Placeholder POC Data
        'Cessna 172': { tails: ['N172FL'], w: 1650.00, a: 40.50 } // Placeholder POC Data
    };
    
    const data = fleet[type] || fleet['DA-40']; // Fallback to DA-40
    document.getElementById('tail-number').innerHTML = data.tails.map(t => `<option value="${t}">${t}</option>`).join('');
    document.getElementById('empty-w').innerText = data.w;
    document.getElementById('empty-a').innerText = data.a;
    calcDispatch();
}

function toggleXC(val) {
    document.getElementById('xc-container').style.display = (val === 'X-Country') ? 'block' : 'none';
}

// ==========================================================
// 4. DATA PERSISTENCE & SYNC
// ==========================================================

/**
 * Global form submission interceptor.
 * Packages data for local IndexedDB persistence during offline periods.
 */
async function handleForm(event, type) {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target).entries());
    
    // Receipt photo processing for Fuel Reimbursement
    const photoInput = document.getElementById('receipt-photo');
    if (photoInput?.files[0]) {
        formData.photoBase64 = await fileToBase64(photoInput.files[0]);
    }

    await saveToSyncQueue(type, formData);
    // alert(`Report Stored Offline: ${type}`);
    // Updated for POC
    showToast(`Saved Offline: ${type} Report`, 'warning');
    navigate('home');
}

/**
 * IndexedDB Sync Queue Visualization for Developers.
 */
async function viewQueue() {
    const db = await openDatabase();
    const records = await new Promise(res => {
        db.transaction('sync-queue', 'readonly').objectStore('sync-queue').getAll().onsuccess = (e) => res(e.target.result);
    });
    const display = document.getElementById('queue-display');
    display.style.display = 'block';
    display.innerHTML = records.length > 0 
        ? records.map(r => `<div><strong>${r.type}</strong>: ${new Date(r.timestamp).toLocaleTimeString()}</div>`).join('')
        : "No pending records.";
}

/**
 * Manually triggers the Background Sync API.
 */

async function triggerManualSync() {
    const status = document.getElementById('connection-status').innerText;
    
    if (status.includes('Offline')) {
        await showToast("Device Offline: Connect to Wi-Fi to sync", "warning");
        return;
    }

    const db = await openDatabase();
    const records = await new Promise(res => {
        db.transaction('sync-queue', 'readonly').objectStore('sync-queue').getAll().onsuccess = (e) => res(e.target.result);
    });

    if (records.length === 0) {
        await showToast("No reports pending sync", "info");
        return;
    }

    // 1. Show the syncing message and WAIT for it to finish/disappear
    await showToast(`Syncing ${records.length} reports to Dispatch...`, "info");

    // 2. Process and clear the queue properly with transactions
    for (const record of records) {
        console.log(`FLT Sync: Uploading ${record.type} Report...`, record.data);
        await new Promise((resolve) => {
            const tx = db.transaction('sync-queue', 'readwrite');
            tx.objectStore('sync-queue').delete(record.id).onsuccess = () => resolve();
        });
    }

    // 3. Show success directly (don’t rely on BroadcastChannel)
    await showToast(`Sync Complete: ${records.length} reports sent to Dispatch`, 'success');

    // Optional: still broadcast for SW/other tabs if supported
    if (typeof BroadcastChannel !== 'undefined') {
    console.log('BC supported?', typeof BroadcastChannel !== 'undefined');
    syncChannel?.postMessage({ type: 'SYNC_COMPLETE', count: records.length });
    }

    if (window.location.hash === '#settings') {
    viewQueue();
    }


    if (window.location.hash === '#settings') {
        viewQueue();
    }
}

// ==========================================================
// 5. COMPONENT RENDERERS
// ==========================================================

function renderAppIcon(route, label, path) {
    return `
        <div class="icon-wrapper" onclick="navigate('${route}')">
            <div class="app-icon" style="background: #ffffff;">
                <svg viewBox="0 0 24 24"><path d="${path}"/></svg>
            </div>
            <span class="app-label">${label}</span>
        </div>`;
}

function renderForm(title, content) {
    return `
        <div class="form-page">
            <div class="form-header">
                <button onclick="navigate('home')" class="back-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                    Back
                </button>
                <h2 style="margin:0; color:var(--flt-blue);">${title}</h2>
            </div>
            ${content}
        </div>`;
}

// ==========================================================
// 6. INITIALIZATION & NETWORK MONITORING
// ==========================================================

navigate('home');

window.addEventListener('online', () => updateStatus('Online', '0.9', '#ffffff'));
window.addEventListener('offline', () => updateStatus('Offline - Pending Sync', '1.0', '#ff9999'));

function updateStatus(text, opacity, color) {
    const status = document.getElementById('connection-status');
    if (status) {
        status.innerText = text;
        status.style.opacity = opacity;
        status.style.color = color;
    }
}

// ==========================================================
// 7. THEME TOGGLING
// ==========================================================

// Function to toggle theme
function toggleNightMode() {
    document.body.classList.toggle('night-mode');
    const isNight = document.body.classList.contains('night-mode');
    localStorage.setItem('flt-theme', isNight ? 'night' : 'day');
}

// Check for saved theme on startup
if (localStorage.getItem('flt-theme') === 'night') {
    document.body.classList.add('night-mode');
}

// ==========================================================
// 8. PWA INSTALLATION INSTRUCTIONS
// ==========================================================

function toggleInstallGuide() {
    const guide = document.getElementById('install-guide');
    guide.style.display = (guide.style.display === 'none') ? 'block' : 'none';
}

// ==========================================================
// 9. NOTIFICATIONS & ALERTS
// ==========================================================

/**
 * UI NOTIFICATION SYSTEM
 * Displays a brief message to the pilot to confirm background tasks.
 */

const syncChannel =
  (typeof BroadcastChannel !== 'undefined')
    ? new BroadcastChannel('flt-sync-notifications')
    : null;

syncChannel.onmessage = (event) => {
    if (event.data.type === 'SYNC_COMPLETE') {
        showToast(`Sync Complete: ${event.data.count} reports sent to Dispatch`, 'success');
        
        // If the user is currently looking at the settings/queue, refresh it
        if (window.location.hash === '#settings') {
            viewQueue();
        }
    }
};

/**
 * UI NOTIFICATION SYSTEM - PROMISE BASED
 * Allows me to chain messages so they don't overlap.
 */
function showToast(message, type = 'info') {
    return new Promise((resolve) => {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        // Remove after 3 seconds and then resolve the promise
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                toast.remove();
                resolve(); // This tells the next toast it's okay to start
            }, 500);
        }, 3000);
    });
}