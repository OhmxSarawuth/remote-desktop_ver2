import * as cheerio from 'cheerio';
import { JSDOM } from 'jsdom'; // Only needed if you're parsing a raw HTML string

// Your HTML content as a string
const htmlContent = `
<tbody class="get_user "><tr><td style="width: 10%; max-width: 10%;">SSH<br><br></td><td style="width: 10%; max-width: 10%;"><font color="black">172.29.26.43</font><br><br><font color="green">minicsr.int.baac.or.th</font></td><td style="width: 10%; max-width: 10%;">minicsr web<br>vm: PRDAPPb56668<br>minicsr<br></td><td style="width: 10%; max-width: 10%;"><br></td><td style="width: 10%; max-width: 10%;"><div>centos 7</div><div style="color:blue">u: root</div><div style="color:blue">p: 1qazse4!QAZSE$</div></td><td style="width: 15%; max-width: 10%;"><br><br>ผู้ดูแล :fhontip.san@baac.or.th<br>WAN: 8812</td><td style="width: 35%; max-width: 35%; word-break: break-all; white-space: normal;"></td><td width="10"><a href="edit.php?id=616" class="button_edit">Edit</a></td><td width="10"><a href="dup.php?id=616" class="button_edit">Dup</a></td>	<td width="10"><a href="del.php?id=616" onclick="return confirm('Are you sure you want to delete this DATA?');" class="button_dell">Del</a></td>
</tr><tr><td style="width: 10%; max-width: 10%;">อื่น ๆ <br><br></td><td style="width: 10%; max-width: 10%;"><font color="black">172.30.111.1</font><br><br><font color="green">cbs101.cbs.baac.or.th</font></td><td style="width: 10%; max-width: 10%;">cbs101<br>vm: cbs101<br>cbs101<br></td><td style="width: 10%; max-width: 10%;"><br></td><td style="width: 10%; max-width: 10%;"><div>redhat7.5</div><div style="color:blue">u: cbsadm</div><div style="color:blue">p: Ciscoprod@123;</div></td><td style="width: 15%; max-width: 10%;"><br><br><br></td><td style="width: 35%; max-width: 35%; word-break: break-all; white-space: normal;">service ip 172.30.110.129</td><td width="10"><a href="edit.php?id=617" class="button_edit">Edit</a></td><td width="10"><a href="dup.php?id=617" class="button_edit">Dup</a></td>	<td width="10"><a href="del.php?id=617" onclick="return confirm('Are you sure you want to delete this DATA?');" class="button_dell">Del</a></td>
</tr><tr><td style="width: 10%; max-width: 10%;">อื่น ๆ <br><br></td><td style="width: 10%; max-width: 10%;"><font color="black">172.30.111.2</font><br><br><font color="green">cbs102.cbs.baac.or.th</font></td><td style="width: 10%; max-width: 10%;">cbs102<br>vm: cbs102<br>cbs102<br></td><td style="width: 10%; max-width: 10%;"><br></td><td style="width: 10%; max-width: 10%;"><div>redhat7.9</div><div style="color:blue">u: cbsadm</div><div style="color:blue">p: Ciscoprod@123;</div></td><td style="width: 15%; max-width: 10%;"><br><br><br></td><td style="width: 35%; max-width: 35%; word-break: break-all; white-space: normal;">service ip 172.30.110.130</td><td width="10"><a href="edit.php?id=618" class="button_edit">Edit</a></td><td width="10"><a href="dup.php?id=618" class="button_edit">Dup</a></td>	<td width="10"><a href="del.php?id=618" onclick="return confirm('Are you sure you want to delete this DATA?');" class="button_dell">Del</a></td>
</tr><tr><td style="width: 10%; max-width: 10%;">อื่น ๆ <br><br></td><td style="width: 10%; max-width: 10%;"><font color="black">172.26.241.144]</font><br><br><font color="green">bch101.core.baac.or.th</font></td><td style="width: 10%; max-width: 10%;">bch101<br>vm: bch101<br>bch101<br></td><td style="width: 10%; max-width: 10%;"><br></td><td style="width: 10%; max-width: 10%;"><div>redhat7.5</div><div style="color:blue">u: crpadm</div><div style="color:blue"></div></td><td style="width: 15%; max-width: 10%;"><br><br><br></td><td style="width: 35%; max-width: 35%; word-break: break-all; white-space: normal;">service ip 172.30.110.131</td><td width="10"><a href="edit.php?id=619" class="button_edit">Edit</a></td><td width="10"><a href="dup.php?id=619" class="button_edit">Dup</a></td>	<td width="10"><a href="del.php?id=619" onclick="return confirm('Are you sure you want to delete this DATA?');" class="button_dell">Del</a></td>
</tr><tr><td style="width: 10%; max-width: 10%;">อื่น ๆ <br><br></td><td style="width: 10%; max-width: 10%;"><font color="black">172.26.241.154</font><br><br><font color="green">bch102.core.baac.or.th</font></td><td style="width: 10%; max-width: 10%;">bch102<br>vm: bch102<br>bch102<br></td><td style="width: 10%; max-width: 10%;"><br></td><td style="width: 10%; max-width: 10%;"><div>redhat7.5</div><div style="color:blue">u: crpadm</div><div style="color:blue">p: Ciscocrp@123;</div></td><td style="width: 15%; max-width: 10%;"><br><br><br></td><td style="width: 35%; max-width: 35%; word-break: break-all; white-space: normal;">service ip 172.30.110.135</td><td width="10"><a href="edit.php?id=620" class="button_edit">Edit</a></td><td width="10"><a href="dup.php?id=620" class="button_edit">Dup</a></td>	<td width="10"><a href="del.php?id=620" onclick="return confirm('Are you sure you want to delete this DATA?');" class="button_dell">Del</a></td>
</tr><tr><td style="width: 10%; max-width: 10%;">อื่น ๆ <br><br></td><td style="width: 10%; max-width: 10%;"><font color="black">172.30.111.4</font><br><br><font color="green">inq101.cbs.baac.or.th</font></td><td style="width: 10%; max-width: 10%;">inq101<br>vm: inq101<br><br></td><td style="width: 10%; max-width: 10%;"><div>redhat7.5</div><div style="color:blue">u: inqadm</div><div style="color:blue">p: pepsiinq</div></td><td style="width: 15%; max-width: 10%;"><br><br><br></td><td style="width: 35%; max-width: 35%; word-break: break-all; white-space: normal;">service ip 172.30.110.132</td><td width="10"><a href="edit.php?id=621" class="button_edit">Edit</a></td><td width="10"><a href="dup.php?id=621" class="button_edit">Dup</a></td>	<td width="10"><a href="del.php?id=621" onclick="return confirm('Are you sure you want to delete this DATA?');" class="button_dell">Del</a></td>
`;

// Define an interface for the extracted data for better type safety
interface ServerInfo {
  typeProtocol: string;
  ipAddress: string;
  hostname: string;
  descriptionVm: string;
  os: string;
  username: string;
  password?: string; // Password might not always be present
  adminWan: string;
  additionalInfo: string;
}

// Function to parse the HTML content
function parseTableData(html: string): ServerInfo[] {
  const $ = cheerio.load(html);
  const serverData: ServerInfo[] = [];

  // Select all table rows within the tbody with class 'get_user'
  $('tbody.get_user tr').each((_index, element) => {
    const columns = $(element).find('td');

    const typeProtocol = columns.eq(0).text().trim();
    const ipAddress = columns.eq(1).find('font[color="black"]').text().trim() || 'N/A';
    const hostname = columns.eq(1).find('font[color="green"]').text().trim() || 'N/A';
    const descriptionVm = columns.eq(2).text().trim();

    let os = 'N/A';
    let username = 'N/A';
    let password: string | undefined;

    const osAndCredsColumn = columns.eq(4);
    if (osAndCredsColumn.length) {
      const osDiv = osAndCredsColumn.find('div').first();
      if (osDiv.length) {
        os = osDiv.text().trim();
      }

      osAndCredsColumn.find('div[style="color:blue"]').each((_idx, divElem) => {
        const text = $(divElem).text().trim();
        if (text.startsWith('u:')) {
          username = text.replace('u:', '').trim();
        } else if (text.startsWith('p:')) {
          password = text.replace('p:', '').trim();
        }
      });
    }

    const adminWan = columns.eq(5).text().trim().replace('ผู้ดูแล :', 'Admin: ').replace('WAN:', 'WAN: ');
    const additionalInfo = columns.eq(6).text().trim();

    serverData.push({
      typeProtocol,
      ipAddress,
      hostname,
      descriptionVm,
      os,
      username,
      password,
      adminWan,
      additionalInfo,
    });
  });

  return serverData;
}

// Parse the data
const parsedData = parseTableData(htmlContent);

// Print the extracted data
parsedData.forEach((server, index) => {
  console.log(`--- Entry ${index + 1} ---`);
  console.log(`Type/Protocol: ${server.typeProtocol}`);
  console.log(`IP Address: ${server.ipAddress}`);
  console.log(`Hostname: ${server.hostname}`);
  console.log(`Description/VM: ${server.descriptionVm}`);
  console.log(`OS: ${server.os}`);
  console.log(`Username: ${server.username}`);
  console.log(`Password: ${server.password ? server.password : 'N/A'}`); // Be cautious with exposing passwords!
  console.log(`Admin/WAN: ${server.adminWan}`);
  console.log(`Additional Info: ${server.additionalInfo}`);
  console.log("-".repeat(20));
});